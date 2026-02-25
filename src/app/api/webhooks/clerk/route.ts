import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error verifying webhook", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    await prisma.user.upsert({
      where: { email: evt.data.email_addresses?.[0]?.email_address! },
      update: {
        clerkId: evt.data.id,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        phone: evt.data.phone_numbers?.[0]?.phone_number ?? null,
        profileImage: evt.data.image_url,
      },
      create: {
        clerkId: evt.data.id,
        email: evt.data.email_addresses?.[0]?.email_address!,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        phone: evt.data.phone_numbers?.[0]?.phone_number ?? null,
        profileImage: evt.data.image_url,
      },
    });
  }
  return new Response("Webhook received", { status: 200 });
}
