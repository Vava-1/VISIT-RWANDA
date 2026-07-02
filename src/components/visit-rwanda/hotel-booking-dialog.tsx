"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hotel, Calendar, Users, BedDouble, User, Mail, Phone, MessageSquare, Loader2, CheckCircle2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/store";

export function HotelBookingDialog() {
  const { bookingOpen, setBookingOpen, bookingHotel, sessionId } = useApp() as any;

  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState("2");
  const [rooms, setRooms] = React.useState("1");
  const [guestName, setGuestName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [specialRequests, setSpecialRequests] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Reset when dialog opens for a new hotel
  React.useEffect(() => {
    if (bookingOpen) {
      setDone(null);
      setError(null);
    }
  }, [bookingOpen, bookingHotel]);

  const today = new Date().toISOString().split("T")[0];

  const submit = async () => {
    if (!checkIn || !checkOut || !guestName.trim() || !email.trim()) {
      setError("Please fill in check-in, check-out, your name and email.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelName: bookingHotel || "Hotel",
          checkIn, checkOut,
          guests: parseInt(guests) || 1,
          rooms: parseInt(rooms) || 1,
          guestName, email, phone, specialRequests,
          sessionId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(data.message || "Booking request received!");
      } else {
        setError(data.error || "Could not submit booking.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {bookingOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookingOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[94vw] max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-to-r from-[#00A1DE]/10 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#00A1DE]/10 text-[#00A1DE] flex items-center justify-center">
                  <Hotel className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-bold leading-tight">Book your stay</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{bookingHotel}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setBookingOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {done ? (
              <div className="p-8 text-center overflow-y-auto">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold text-lg">Booking request received!</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{done}</p>
                <Button className="mt-5" onClick={() => setBookingOpen(false)}>Done</Button>
              </div>
            ) : (
              <div className="p-5 space-y-4 overflow-y-auto">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="ci" className="flex items-center gap-1.5 text-xs"><Calendar className="h-3.5 w-3.5" /> Check-in</Label>
                    <Input id="ci" type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="co" className="flex items-center gap-1.5 text-xs"><Calendar className="h-3.5 w-3.5" /> Check-out</Label>
                    <Input id="co" type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                </div>

                {/* Guests & rooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="g" className="flex items-center gap-1.5 text-xs"><Users className="h-3.5 w-3.5" /> Guests</Label>
                    <Input id="g" type="number" min="1" max="20" value={guests} onChange={(e) => setGuests(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r" className="flex items-center gap-1.5 text-xs"><BedDouble className="h-3.5 w-3.5" /> Rooms</Label>
                    <Input id="r" type="number" min="1" max="10" value={rooms} onChange={(e) => setRooms(e.target.value)} />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-1.5">
                  <Label htmlFor="gn" className="flex items-center gap-1.5 text-xs"><User className="h-3.5 w-3.5" /> Full name</Label>
                  <Input id="gn" value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="em" className="flex items-center gap-1.5 text-xs"><Mail className="h-3.5 w-3.5" /> Email</Label>
                    <Input id="em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ph" className="flex items-center gap-1.5 text-xs"><Phone className="h-3.5 w-3.5" /> Phone</Label>
                    <Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+250..." />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sr" className="flex items-center gap-1.5 text-xs"><MessageSquare className="h-3.5 w-3.5" /> Special requests (optional)</Label>
                  <Textarea id="sr" rows={2} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Dietary needs, late arrival, room preference..." />
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-2.5">{error}</div>
                )}

                <Button className="w-full gap-2" onClick={submit} disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="h-4 w-4" /> Request booking</>}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Free inquiry. Our team confirms availability within 24 hours. No payment now.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
