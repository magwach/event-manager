"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import cloudinary from "../cloudinary";
import { Event } from "@/generated/prisma/browser";
import { getPublicIdFromUrl } from "../utils";

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
      console.error(error);
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

export async function editEvent(event: Event) {
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

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: event.id,
      },
    });

    if (!existingEvent) throw new Error("Couldn't find the event");

    const isImageChanged = existingEvent.image !== event.image;
    let uploadedImage;
    let newEventRemainingCapacity;

    if (isImageChanged) {
      try {
        const publicId = getPublicIdFromUrl(existingEvent.image);

        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }

        uploadedImage = await cloudinary.uploader.upload(event.image, {
          folder: "event-manager/images",
          resource_type: "image",
          quality: "100",
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to modify the image");
      }
    }

    const eventCapacityDifference = event.capacity - existingEvent.capacity;

    if (eventCapacityDifference === 0) {
      newEventRemainingCapacity = event.capacity;
    } else if (eventCapacityDifference > 0) {
      newEventRemainingCapacity =
        existingEvent.capacity + eventCapacityDifference;
    } else {
      newEventRemainingCapacity =
        existingEvent.capacity - Math.abs(eventCapacityDifference) <= 0
          ? 0
          : existingEvent.capacity - Math.abs(eventCapacityDifference);
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id: event.id,
      },
      data: {
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription,
        date: event.date,
        category: event.category,
        location: event.location,
        organizer: event.organizer,
        image: isImageChanged ? uploadedImage?.secure_url : existingEvent.image,
        time: event.time,
        duration: event.duration,
        price: event.price,
        capacity: event.capacity,
        remainingCapacity: newEventRemainingCapacity,
      },
    });
    return updatedEvent;
  } catch (error) {
    console.error("Error updating event", error);
    throw new Error("Error updating event");
  }
}
