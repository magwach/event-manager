"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getAllEvents() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!existingUser) throw new Error("User not found");
    if (existingUser.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      throw new Error("Unauthorized");

    const events = await prisma.event.findMany({});

    return events;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return [];
  }
}
 