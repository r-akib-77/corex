"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Check,
  X,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

type Slot = {
  time: string;
  price: number;
  original: number;
};

const ADVANCE_AMOUNT = 500;

const daySlots: Slot[] = [
  { time: "6:00 AM – 7:30 AM", price: 2000, original: 2500 },
  { time: "7:30 AM – 9:00 AM", price: 2000, original: 2500 },
  { time: "9:00 AM – 10:30 AM", price: 2000, original: 2500 },
  { time: "10:30 AM – 12:00 PM", price: 2000, original: 2500 },
  { time: "12:00 PM – 1:30 PM", price: 2000, original: 2500 },
  { time: "1:30 PM – 3:00 PM", price: 2000, original: 2500 },
  { time: "3:00 PM – 4:30 PM", price: 2000, original: 2500 },
];

const eveningSlots: Slot[] = [
  { time: "5:00 PM – 6:30 PM", price: 4000, original: 4500 },
  { time: "6:30 PM – 8:00 PM", price: 4000, original: 4500 },
  { time: "8:00 PM – 9:30 PM", price: 4000, original: 4500 },
  { time: "9:30 PM – 11:00 PM", price: 4000, original: 4500 },
  { time: "11:00 PM – 12:30 AM", price: 4000, original: 4500 },
  { time: "12:30 AM – 2:00 AM", price: 4000, original: 4500 },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default function BookingPage() {
  const today = useMemo(() => startOfDay(new Date()), []);

  // =========================================================
  // DATE / SLOT STATE
  // =========================================================

  const [calendarMode, setCalendarMode] = useState<"quick" | "calendar">(
    "quick",
  );

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [dateOffset, setDateOffset] = useState(0);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // =========================================================
  // CHECKOUT FORM STATE
  // =========================================================

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  // =========================================================
  // QUICK PICK DATES
  // =========================================================

  const quickDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);

      date.setDate(today.getDate() + dateOffset + index);

      return date;
    });
  }, [today, dateOffset]);

  // =========================================================
  // MONTHLY CALENDAR
  // =========================================================

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [calendarMonth]);

  // =========================================================
  // DATE SELECT
  // =========================================================

  const selectDate = (date: Date) => {
    const normalizedDate = startOfDay(date);

    if (normalizedDate < today) {
      return;
    }

    setSelectedDate(normalizedDate);

    // Changing date clears selected slot
    setSelectedSlot(null);

    // Keep calendar on selected date
    setCalendarMonth(
      new Date(normalizedDate.getFullYear(), normalizedDate.getMonth(), 1),
    );

    // Close checkout if date is changed
    setIsCheckoutOpen(false);
  };

  // =========================================================
  // QUICK PICK NAVIGATION
  // =========================================================

  const previousQuickDates = () => {
    if (dateOffset === 0) return;

    setDateOffset((prev) => Math.max(0, prev - 7));
  };

  const nextQuickDates = () => {
    setDateOffset((prev) => prev + 7);
  };

  // =========================================================
  // MONTH NAVIGATION
  // =========================================================

  const previousMonth = () => {
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const newMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1,
    );

    // Don't allow past months
    if (newMonth >= currentMonth) {
      setCalendarMonth(newMonth);
    }
  };

  const nextMonth = () => {
    const newMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      1,
    );

    setCalendarMonth(newMonth);
  };

  // =========================================================
  // SLOT SELECT
  // =========================================================

  const selectSlot = (slot: Slot) => {
    // Click selected slot again = unselect
    if (selectedSlot?.time === slot.time) {
      setSelectedSlot(null);
      return;
    }

    setSelectedSlot(slot);
  };

  // =========================================================
  // OPEN CHECKOUT
  // =========================================================

  const handleContinue = () => {
    if (!selectedSlot) return;

    setIsCheckoutOpen(true);
  };

  // =========================================================
  // CLOSE CHECKOUT
  // =========================================================

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // =========================================================
  // ESC KEY + BODY SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (!isCheckoutOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCheckoutOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isCheckoutOpen]);

  // =========================================================
  // PAYMENT
  // =========================================================

  const handlePayment = () => {
    if (!selectedSlot) return;

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    const remainingAmount = selectedSlot.price - ADVANCE_AMOUNT;

    console.log({
      name,
      phone,
      date: selectedDate.toISOString(),
      slot: selectedSlot.time,
      totalAmount: selectedSlot.price,
      advanceAmount: ADVANCE_AMOUNT,
      remainingAmount,
      paymentMethod: "bKash",
    });

    /*
     * =======================================================
     * REAL BKASH PAYMENT WILL GO HERE
     * =======================================================
     *
     * Send:
     *
     * amount: 500
     *
     * to your backend.
     *
     * The backend should create the bKash payment request
     * and return the payment URL / execute payment flow.
     */
  };

  // =========================================================
  // MONTH NAME
  // =========================================================

  const monthName = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-[family-name:var(--font-sora)] text-[10px] font-bold uppercase tracking-[0.28em] text-[#EF1B23] sm:text-xs">
            CoreX Arena
          </span>

          <h1 className="mt-3 font-[family-name:var(--font-sora)] text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Book Your
            <br />
            <span className="text-[#EF1B23]">Slot.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-inter)] text-sm leading-6 text-white/40 sm:text-base">
            Pick your date. Choose your time. Play your game.
          </p>
        </div>
      </section>

      {/* =====================================================
          BOOKING
      ====================================================== */}

      <section className="px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* =================================================
              STEP 01 — DATE
          ================================================== */}

          <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 shadow-2xl sm:rounded-3xl sm:p-6 lg:p-7">
            {/* Header */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EF1B23]/10 text-[#EF1B23] sm:h-11 sm:w-11">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="font-[family-name:var(--font-sora)] text-[9px] font-bold uppercase tracking-[0.2em] text-[#EF1B23] sm:text-[10px]">
                  Step 01
                </p>

                <h2 className="mt-1 font-[family-name:var(--font-sora)] text-base font-bold sm:text-lg">
                  Choose Your Date
                </h2>
              </div>
            </div>

            {/* =================================================
                QUICK / CALENDAR SWITCH
            ================================================== */}

            <div className="mt-5 rounded-xl border border-white/10 bg-[#111111] p-1">
              <div className="grid grid-cols-2">
                {/* Quick Pick */}

                <button
                  type="button"
                  onClick={() => setCalendarMode("quick")}
                  className={`
                    rounded-lg
                    py-2.5
                    font-[family-name:var(--font-sora)]
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      calendarMode === "quick"
                        ? "bg-[#EF1B23] text-white shadow-[0_4px_15px_rgba(239,27,35,0.2)]"
                        : "text-white/35 hover:text-white/60"
                    }
                  `}
                >
                  Quick Pick
                </button>

                {/* Calendar */}

                <button
                  type="button"
                  onClick={() => setCalendarMode("calendar")}
                  className={`
                    rounded-lg
                    py-2.5
                    font-[family-name:var(--font-sora)]
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      calendarMode === "calendar"
                        ? "bg-[#EF1B23] text-white shadow-[0_4px_15px_rgba(239,27,35,0.2)]"
                        : "text-white/35 hover:text-white/60"
                    }
                  `}
                >
                  Calendar
                </button>
              </div>
            </div>

            {/* =================================================
                QUICK PICK
            ================================================== */}

            {calendarMode === "quick" && (
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  {/* Previous */}

                  <button
                    type="button"
                    onClick={previousQuickDates}
                    disabled={dateOffset === 0}
                    className="
                      flex
                      h-10
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.02]
                      text-white/30
                      transition
                      hover:border-white/20
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-20
                    "
                    aria-label="Previous dates"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Dates */}

                  <div className="scrollbar-hide flex flex-1 gap-2 overflow-x-auto">
                    {quickDates.map((date) => {
                      const selected = isSameDay(date, selectedDate);
                      const todayDate = isSameDay(date, today);

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => selectDate(date)}
                          className={`
                            min-w-[68px]
                            flex-1
                            rounded-xl
                            border
                            px-2
                            py-3
                            text-center
                            transition-all
                            duration-200
                            sm:min-w-[78px]
                            sm:px-3
                            sm:py-4
                            ${
                              selected
                                ? "border-[#EF1B23] bg-[#EF1B23] text-white shadow-[0_8px_25px_rgba(239,27,35,0.2)]"
                                : "border-white/10 bg-[#111111] text-white/50 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                            }
                          `}
                        >
                          <span
                            className={`
                              block
                              font-[family-name:var(--font-sora)]
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wider
                              ${
                                selected
                                  ? "text-white/80"
                                  : todayDate
                                    ? "text-[#EF1B23]"
                                    : "text-white/30"
                              }
                            `}
                          >
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </span>

                          <span
                            className={`
                              mt-1
                              block
                              font-[family-name:var(--font-sora)]
                              text-xl
                              font-extrabold
                              leading-none
                              sm:text-2xl
                              ${selected ? "text-white" : "text-white/80"}
                            `}
                          >
                            {date.getDate()}
                          </span>

                          <span
                            className={`
                              mt-1
                              block
                              font-[family-name:var(--font-inter)]
                              text-[9px]
                              font-semibold
                              uppercase
                              ${selected ? "text-white/70" : "text-white/25"}
                            `}
                          >
                            {date.toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Next */}

                  <button
                    type="button"
                    onClick={nextQuickDates}
                    className="
                      flex
                      h-10
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.02]
                      text-white/30
                      transition
                      hover:border-white/20
                      hover:text-white
                    "
                    aria-label="Next dates"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                MONTHLY CALENDAR
            ================================================== */}

            {calendarMode === "calendar" && (
              <div className="mx-auto mt-5 w-full max-w-2xl">
                {/* Month Header */}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Calendar
                    </p>

                    <h3 className="mt-1 font-[family-name:var(--font-sora)] text-lg font-bold sm:text-xl">
                      {monthName}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={previousMonth}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        bg-white/[0.02]
                        text-white/40
                        transition
                        hover:border-white/20
                        hover:text-white
                      "
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={nextMonth}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        bg-white/[0.02]
                        text-white/40
                        transition
                        hover:border-white/20
                        hover:text-white
                      "
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Week Days */}

                <div className="mt-5 grid grid-cols-7">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="
                        py-2
                        text-center
                        font-[family-name:var(--font-inter)]
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-white/25
                        sm:text-[10px]
                      "
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {calendarDays.map((date, index) => {
                    if (!date) {
                      return (
                        <div key={`empty-${index}`} className="aspect-square" />
                      );
                    }

                    const isPast = date < today;
                    const selected = isSameDay(date, selectedDate);
                    const todayDate = isSameDay(date, today);

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        disabled={isPast}
                        onClick={() => selectDate(date)}
                        className={`
                          relative
                          flex
                          aspect-square
                          items-center
                          justify-center
                          rounded-lg
                          font-[family-name:var(--font-sora)]
                          text-xs
                          font-semibold
                          transition-all
                          sm:rounded-xl
                          sm:text-sm
                          ${
                            isPast
                              ? "cursor-not-allowed text-white/[0.08]"
                              : selected
                                ? "bg-[#EF1B23] text-white shadow-[0_8px_20px_rgba(239,27,35,0.2)]"
                                : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                          }
                        `}
                      >
                        {date.getDate()}

                        {todayDate && !selected && (
                          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#EF1B23]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================
                SELECTED DATE
            ================================================== */}

            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.18em] text-white/25">
                Selected Date
              </p>

              <p className="mt-1 font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </section>

          {/* =================================================
              STEP 02 — DAY SLOTS
          ================================================== */}

          <SlotSection
            step="02"
            icon="☀"
            title="Day Slots"
            hours="6:00 AM – 4:30 PM"
            slots={daySlots}
            selectedSlot={selectedSlot}
            onSelect={selectSlot}
          />

          {/* =================================================
              STEP 03 — EVENING SLOTS
          ================================================== */}

          <SlotSection
            step="03"
            icon="◐"
            title="Evening Slots"
            hours="5:00 PM – 2:00 AM"
            slots={eveningSlots}
            selectedSlot={selectedSlot}
            onSelect={selectSlot}
          />

          {/* =================================================
              STICKY CONTINUE BAR
          ================================================== */}

          <div
            className={`
              sticky
              bottom-4
              z-30
              mt-5
              rounded-2xl
              border
              bg-[#161616]/95
              shadow-2xl
              backdrop-blur-xl
              transition-all
              sm:mt-6
              ${selectedSlot ? "border-[#EF1B23]/30" : "border-white/10"}
            `}
          >
            <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
              {/* Selected info */}

              <div className="min-w-0">
                <p className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.18em] text-white/30 sm:text-[10px]">
                  {selectedSlot ? "Selected Slot" : "Choose a Slot"}
                </p>

                <p className="mt-1 truncate font-[family-name:var(--font-sora)] text-xs font-bold text-white sm:text-sm">
                  {selectedSlot
                    ? selectedSlot.time
                    : "Select a time to continue"}
                </p>

                {selectedSlot && (
                  <p className="mt-1 font-[family-name:var(--font-inter)] text-[11px] text-white/40">
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    ·{" "}
                    <span className="text-[#EF1B23]">
                      ৳{ADVANCE_AMOUNT} advance
                    </span>
                  </p>
                )}
              </div>

              {/* Continue */}

              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedSlot}
                className="
                  group
                  flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#EF1B23]
                  px-4
                  py-3
                  font-[family-name:var(--font-sora)]
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  transition-all
                  hover:bg-[#ff2932]
                  disabled:cursor-not-allowed
                  disabled:bg-white/10
                  disabled:text-white/25
                  sm:px-5
                  sm:text-xs
                "
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHECKOUT MODAL
      ====================================================== */}

      {isCheckoutOpen && selectedSlot && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-end
            justify-center
            bg-black/80
            p-0
            backdrop-blur-md
            sm:items-center
            sm:p-5
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCheckout();
            }
          }}
        >
          {/* MODAL */}

          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-t-[28px]
              border
              border-white/10
              bg-[#111111]
              shadow-[0_-20px_80px_rgba(0,0,0,0.7)]
              sm:rounded-[28px]
              sm:shadow-[0_20px_80px_rgba(0,0,0,0.7)]
            "
          >
            {/* Red glow */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-[#EF1B23]/10 blur-3xl" />

            {/* =================================================
                MODAL HEADER
            ================================================== */}

            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
              <div>
                <p className="font-[family-name:var(--font-sora)] text-[9px] font-bold uppercase tracking-[0.22em] text-[#EF1B23]">
                  Almost There
                </p>

                <h2 className="mt-1 font-[family-name:var(--font-sora)] text-xl font-bold sm:text-2xl">
                  Complete Booking
                </h2>
              </div>

              <button
                type="button"
                onClick={closeCheckout}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-white/40
                  transition
                  hover:bg-white/[0.07]
                  hover:text-white
                "
                aria-label="Close checkout"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* =================================================
                MODAL BODY
            ================================================== */}

            <div className="relative max-h-[82vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {/* =================================================
                  BOOKING SUMMARY
              ================================================== */}

              <div className="rounded-2xl border border-[#EF1B23]/20 bg-[#EF1B23]/[0.06] p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Slot */}

                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                      Selected Slot
                    </p>

                    <p className="mt-1.5 font-[family-name:var(--font-sora)] text-base font-bold text-white sm:text-lg">
                      {selectedSlot.time}
                    </p>

                    <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-white/40">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Total */}

                  <div className="shrink-0 text-right">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/30">
                      Total
                    </p>

                    <p className="mt-0.5 font-[family-name:var(--font-sora)] text-xl font-extrabold text-white sm:text-2xl">
                      ৳{selectedSlot.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <div className="mt-6 space-y-5">
                {/* =================================================
                    NAME
                ================================================== */}

                <div>
                  <label
                    htmlFor="booking-name"
                    className="mb-2 block font-[family-name:var(--font-sora)] text-xs font-semibold text-white/70"
                  >
                    Name
                  </label>

                  <input
                    id="booking-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="
                      h-13
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      px-4
                      font-[family-name:var(--font-inter)]
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/20
                      transition
                      focus:border-[#EF1B23]/60
                      focus:bg-white/[0.05]
                      focus:ring-2
                      focus:ring-[#EF1B23]/10
                    "
                  />
                </div>

                {/* =================================================
                    PHONE
                ================================================== */}

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="mb-2 block font-[family-name:var(--font-sora)] text-xs font-semibold text-white/70"
                  >
                    Mobile Number
                  </label>

                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="01XXXXXXXXX"
                      inputMode="numeric"
                      autoComplete="tel"
                      className="
                        h-13
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        pl-11
                        pr-4
                        font-[family-name:var(--font-inter)]
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition
                        focus:border-[#EF1B23]/60
                        focus:bg-white/[0.05]
                        focus:ring-2
                        focus:ring-[#EF1B23]/10
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    SLOT TIME
                ================================================== */}

                <div>
                  <label className="mb-2 block font-[family-name:var(--font-sora)] text-xs font-semibold text-white/70">
                    Slot Time
                  </label>

                  <div className="flex min-h-[52px] items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Clock3 className="h-4 w-4 shrink-0 text-[#EF1B23]" />

                      <span className="truncate font-[family-name:var(--font-inter)] text-sm text-white/70">
                        {selectedSlot.time}
                      </span>
                    </div>

                    <span className="shrink-0 rounded-full bg-white/[0.05] px-2.5 py-1 font-[family-name:var(--font-inter)] text-[9px] font-medium text-white/35">
                      1.5 HOUR
                    </span>
                  </div>
                </div>

                {/* =================================================
                    PAYMENT METHOD
                ================================================== */}

                <div>
                  <p className="mb-2 font-[family-name:var(--font-sora)] text-xs font-semibold text-white/70">
                    Payment Method
                  </p>

                  <div
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-[#E2136E]/40
                      bg-[#E2136E]/[0.05]
                      p-4
                    "
                  >
                    <div className="flex items-center gap-3">
                      {/* bKash Logo */}

                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
                        <Image
                          src="/bkash-logo.webp"
                          alt="bKash"
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div>
                        <p className="font-[family-name:var(--font-sora)] text-sm font-bold text-white">
                          bKash
                        </p>

                        <p className="mt-0.5 font-[family-name:var(--font-inter)] text-[10px] text-white/35">
                          Advance payment
                        </p>
                      </div>
                    </div>

                    {/* Selected indicator */}

                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#E2136E]">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#E2136E]" />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    PAYMENT BREAKDOWN
                ================================================== */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-xs text-white/40">
                      Slot Price
                    </span>

                    <span className="font-[family-name:var(--font-inter)] text-sm text-white">
                      ৳{selectedSlot.price}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-xs text-white/40">
                      Advance Payment
                    </span>

                    <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-[#EF1B23]">
                      ৳{ADVANCE_AMOUNT}
                    </span>
                  </div>

                  <div className="my-3 h-px bg-white/10" />

                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                      Pay Now
                    </span>

                    <span className="font-[family-name:var(--font-sora)] text-xl font-extrabold text-white">
                      ৳{ADVANCE_AMOUNT}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30">
                      Remaining at venue
                    </span>

                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold text-white/50">
                      ৳{selectedSlot.price - ADVANCE_AMOUNT}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    PAYMENT BUTTON
                ================================================== */}

                <button
                  type="button"
                  onClick={handlePayment}
                  className="
                    group
                    flex
                    h-14
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#EF1B23]
                    font-[family-name:var(--font-sora)]
                    text-sm
                    font-bold
                    uppercase
                    tracking-wide
                    text-white
                    shadow-[0_8px_30px_rgba(239,27,35,0.2)]
                    transition-all
                    duration-300
                    hover:bg-[#ff2932]
                    hover:shadow-[0_0_35px_rgba(239,27,35,0.3)]
                    active:scale-[0.98]
                  "
                >
                  <span>Pay ৳{ADVANCE_AMOUNT} Advance</span>

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center font-[family-name:var(--font-inter)] text-[10px] leading-5 text-white/25">
                  Pay ৳{ADVANCE_AMOUNT} now to confirm your slot. The remaining
                  amount is payable at the venue.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ============================================================
   SLOT SECTION
============================================================ */

function SlotSection({
  step,
  icon,
  title,
  hours,
  slots,
  selectedSlot,
  onSelect,
}: {
  step: string;
  icon: string;
  title: string;
  hours: string;
  slots: Slot[];
  selectedSlot: Slot | null;
  onSelect: (slot: Slot) => void;
}) {
  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 sm:mt-6 sm:rounded-3xl sm:p-7">
      {/* =================================================
          HEADER
      ================================================== */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Icon */}

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EF1B23]/10 text-xl sm:h-12 sm:w-12">
            {icon}
          </div>

          {/* Title */}

          <div>
            <p className="font-[family-name:var(--font-sora)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#EF1B23]">
              Step {step}
            </p>

            <h2 className="mt-1 font-[family-name:var(--font-sora)] text-lg font-bold sm:text-xl">
              {title}
            </h2>

            <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-white/30">
              {hours}
            </p>
          </div>
        </div>

        {/* Advance badge */}

        <span className="shrink-0 rounded-full bg-[#EF1B23]/10 px-3 py-1.5 font-[family-name:var(--font-sora)] text-[10px] font-bold text-[#EF1B23]">
          ৳500 ADVANCE
        </span>
      </div>

      {/* =================================================
          SLOTS
      ================================================== */}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => {
          const selected = selectedSlot?.time === slot.time;

          return (
            <button
              key={slot.time}
              type="button"
              onClick={() => onSelect(slot)}
              className={`
                group
                flex
                min-h-[76px]
                w-full
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                px-4
                py-4
                text-left
                transition-all
                duration-200
                sm:min-h-[82px]
                sm:px-5
                sm:py-4
                ${
                  selected
                    ? "border-[#EF1B23] bg-[#EF1B23]/10 shadow-[0_0_25px_rgba(239,27,35,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }
              `}
            >
              {/* =================================================
                  LEFT
              ================================================== */}

              <div className="flex min-w-0 items-center gap-3">
                {/* Clock / Check */}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    sm:h-11
                    sm:w-11
                    ${
                      selected
                        ? "bg-[#EF1B23] text-white"
                        : "bg-white/[0.04] text-white/30 group-hover:text-white/50"
                    }
                  `}
                >
                  {selected ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Clock3 className="h-5 w-5" />
                  )}
                </div>

                {/* Time */}

                <div className="min-w-0">
                  <p
                    className={`
                      font-[family-name:var(--font-sora)]
                      text-sm
                      font-bold
                      leading-tight
                      sm:text-base
                      ${selected ? "text-white" : "text-white/80"}
                    `}
                  >
                    {slot.time}
                  </p>

                  <p className="mt-1.5 font-[family-name:var(--font-inter)] text-[11px] text-white/30 sm:text-xs">
                    1.5 hour
                  </p>
                </div>
              </div>

              {/* =================================================
                  PRICE
              ================================================== */}

              <div className="shrink-0 text-right">
                <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 line-through sm:text-xs">
                  ৳{slot.original}
                </p>

                <p
                  className={`
                    mt-0.5
                    font-[family-name:var(--font-sora)]
                    text-base
                    font-extrabold
                    sm:text-lg
                    ${selected ? "text-[#EF1B23]" : "text-white"}
                  `}
                >
                  ৳{slot.price}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
