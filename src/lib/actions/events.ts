"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import cloudinary from "../cloudinary";
import { Event } from "@/generated/prisma/browser";
import { generateReceipt } from "../server-utils/utils";
import { generateReceiptId, getPublicIdFromUrl } from "../clent-utils/utils";

export async function getAllEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "desc" },
    });

    return events;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return [];
  }
}

export async function getEventDetails(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) throw new Error("Event not Found");

    return event;
  } catch (error) {
    console.error("Couldn't find event", error);
    throw new Error("Error fetching event");
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
    const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") ?? [];
    if (!ADMIN_EMAILS.includes(existingUser?.email!))
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
    const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") ?? [];
    if (!ADMIN_EMAILS.includes(existingUser?.email!))
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
      newEventRemainingCapacity = event.remainingCapacity;
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

export async function checkBookingAvailability(eventId: string) {
  try {
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) throw new Error("Event not found");

    return existingEvent;
  } catch (error) {
    console.error("Error while checking booking availability", error);
    throw new Error("Error while checking booking availability");
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") ?? [];
    if (!ADMIN_EMAILS.includes(existingUser?.email!))
      throw new Error("Unauthorized");

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) throw new Error("Couldn't find the event");

    try {
      const publicId = getPublicIdFromUrl(existingEvent.image);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete the image");
    }

    const deletedEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return deletedEvent;
  } catch (error) {
    console.error("Error deleting event", error);
    throw new Error("Error deleting event");
  }
}

export async function bookEvent(
  sessionId: string,
  eventId: string,
  clerkId: string,
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!existingUser) throw new Error("User not found");

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) throw new Error("Couldn't find the event");
    const existingBookedEvent = await prisma.bookedEvents.findUnique({
      where: {
        sessionId,
      },
    });
    if (existingBookedEvent) throw new Error("Already booked");
    const receiptId = generateReceiptId();
    const bookedEvent = await prisma.bookedEvents.create({
      data: {
        userId: existingUser?.id,
        eventId: existingEvent?.id,
        sessionId,
        receiptId,
        receipt: "",
      },
    });

    let updatedRemainingCapacity = existingEvent.remainingCapacity - 1;

    await prisma.event.update({
      where: {
        id: existingEvent.id,
      },
      data: {
        remainingCapacity: updatedRemainingCapacity,
      },
    });

    let receipt = null;

    try {
      receipt = await generateReceipt(
        bookedEvent,
        existingUser,
        existingEvent,
        existingEvent.price,
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate receipt");
    }

    if (receipt) {
      await prisma.bookedEvents.update({
        where: {
          id: bookedEvent.id,
        },
        data: {
          receipt,
        },
      });
    }
    return {
      receiptId,
      eventTitle: existingEvent.title,
      date: existingEvent.date,
      time: existingEvent.time,
      location: existingEvent.location,
      category: existingEvent.category,
      price: existingEvent.price,
      total: existingEvent.price,
      attendee:
        `${existingUser.firstName ?? ""} ${existingUser.lastName ?? ""}`.trim(),
      bookedAt: bookedEvent.createdAt,
      downloadUrl: receipt ?? "",
      sessionId: bookedEvent.sessionId,
    };
  } catch (error) {
    console.error("Error while booking event", error);
    throw new Error("Error while booking event");
  }
}
