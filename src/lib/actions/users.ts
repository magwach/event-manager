"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getUserProfile() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");

    console.log(user.id);

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        bookedEvents: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!existingUser) throw new Error("User not found");
    return existingUser;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
