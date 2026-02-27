import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  console.log("CLERK_WEBHOOK_SECRET set:", !!process.env.CLERK_WEBHOOK_SECRET);
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
    console.error("Webhook verification failed:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      await prisma.user.create({
        data: {
          clerkId: evt.data.id,
          email: evt.data.email_addresses?.[0]?.email_address ?? null,
          firstName: evt.data?.first_name ?? null,
          lastName: evt.data?.last_name ?? null,
          phone: evt.data.phone_numbers?.[0]?.phone_number ?? null,
          profileImage: evt.data?.image_url ?? null,
        },
      });
    } catch (error) {
      console.error("DB ERROR:", error);
      return new Response("Database error", { status: 500 });
    }
  }
  return new Response("Webhook received", { status: 200 });
}
