import { bookEvent } from "@/lib/actions/events";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionId, payment, eventId, clerkId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required" },
        { status: 400 },
      );
    }

    if (payment === "free") {
      try {
        const bookedEvent = await bookEvent(sessionId, eventId, clerkId);

        return NextResponse.json(
          { message: "Event Booked Successfully", event: bookedEvent },
          { status: 200 },
        );
      } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
          { message: "Failed to book event" },
          { status: 500 },
        );
      }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 },
      );
    }

    if (
      session.payment_status === "paid" &&
      session.metadata?.eventId &&
      session.metadata?.clerkId
    ) {
      try {
        const bookedEvent = await bookEvent(
          sessionId,
          session.metadata.eventId,
          session.metadata.clerkId,
        );

        return NextResponse.json(
          { message: "Event Booked Successfully", event: bookedEvent },
          { status: 200 },
        );
      } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
          { message: "Failed to book event" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { message: "Session couldn't be verified" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error while booking event", error);
    return NextResponse.json(
      { message: "Server error while booking event" },
      { status: 500 },
    );
  }
}
