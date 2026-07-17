import { useState } from "react";
import type { Booking } from "../types";

interface Props {
  bookings: Booking[];
  onUpdateBooking: (id: string, status: Booking["status"]) => void;
}

export default function BookingsPage({ bookings, onUpdateBooking }: Props) {
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const statusColors: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500">Manage and track all your appointments</p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 text-xs opacity-60">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filtered.map((booking) => (
          <div key={booking.id} className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                  {booking.clientName.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{booking.clientName}</p>
                  <p className="text-sm text-gray-500">{booking.service}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{booking.date}</p>
                  <p className="text-xs text-gray-400">{booking.time}</p>
                </div>
                <span className="text-lg font-bold text-gray-800">${booking.amount}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
            </div>

            {booking.status === "pending" && (
              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => onUpdateBooking(booking.id, "confirmed")}
                  className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => onUpdateBooking(booking.id, "cancelled")}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Decline
                </button>
              </div>
            )}
            {booking.status === "confirmed" && (
              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => onUpdateBooking(booking.id, "completed")}
                  className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => onUpdateBooking(booking.id, "cancelled")}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <svg className="mb-3 h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="font-medium">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}
