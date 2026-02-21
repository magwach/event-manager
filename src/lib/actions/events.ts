"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { Event } from "@/generated/prisma/browser";
import cloudinary from "../cloudinary";
import { UploadApiErrorResponse } from "cloudinary";

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

export async function addEvent(event: any) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (existingUser?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      throw new Error("Unauthorized");
    let uploadedImage;

    try {
      uploadedImage = await cloudinary.uploader.upload(event.image, {
        folder: "event-manager/images",
        resource_type: "image",
        quality: "100",
      });
    } catch (error) {
      throw new Error("Failed to upload image");
    }

    const addedEvent = await prisma.event.create({
      data: {
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription,
        date: event.date,
        category: event.category,
        location: event.location,
        organizer: event.organizer,
        image: uploadedImage?.secure_url,
        time: event.time,
        duration: event.duration,
        price: event.price,
        capacity: event.capacity,
        remainingCapacity: event.remainingCapacity,
      },
    });
    return addedEvent;
  } catch (error) {
    console.error("Error adding event", error);
    throw new Error("Error adding event");
  }
}
