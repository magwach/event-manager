import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, productName, image, eventId, clerkId } = await req.json();

    if (!amount || !productName || !image || !eventId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "kes",
            product_data: {
              name: productName,
              images: [image],
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId,
        clerkId,
      },
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel?eventId=${eventId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
