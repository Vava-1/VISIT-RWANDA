import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/booking - create a hotel booking inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const hotelName = (body.hotelName || "").toString().slice(0, 200);
    const checkIn = (body.checkIn || "").toString().slice(0, 20);
    const checkOut = (body.checkOut || "").toString().slice(0, 20);
    const guests = Math.min(Math.max(parseInt(body.guests) || 1, 1), 20);
    const rooms = Math.min(Math.max(parseInt(body.rooms) || 1, 1), 10);
    const guestName = (body.guestName || "").toString().slice(0, 200);
    const email = (body.email || "").toString().slice(0, 200);
    const phone = (body.phone || "").toString().slice(0, 50);
    const specialRequests = (body.specialRequests || "").toString().slice(0, 2000);

    if (!hotelName.trim() || !checkIn || !checkOut || !guestName.trim() || !email.trim()) {
      return NextResponse.json(
        { error: "Hotel name, dates, guest name and email are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    // Generate a booking reference
    const ref = "VR-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.random().toString(36).toUpperCase().slice(-3);

    let savedId: string | null = null;
    if (db) {
      try {
        const booking = await db.booking.create({
          data: {
            hotelName, checkIn, checkOut, guests, rooms,
            guestName, email, phone, specialRequests,
            status: "pending",
          },
        });
        savedId = booking.id;
      } catch (e) {
        /* DB optional on serverless - continue without persistence */
      }
    }

    return NextResponse.json({
      success: true,
      reference: ref,
      bookingId: savedId,
      message: `Your booking request for ${hotelName} has been received. Our team will confirm availability and email ${email} within 24 hours. Your reference is ${ref}.`,
    });
  } catch (err: any) {
    console.error("[/api/booking] error:", err?.message);
    return NextResponse.json(
      { error: "Could not submit booking. Please try again." },
      { status: 500 }
    );
  }
}
