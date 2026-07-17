import { dashboardStats } from "../data/mockData";
import type { Booking } from "../types";

interface Props {
  bookings: Booking[];
}

export default function DashboardPage({ bookings }: Props) {
  const todayBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending");
  
  const stats = [
    {
      label: "Today's Bookings",
      value: dashboardStats.todayBookings,
      change: "+2 from yesterday",
      icon: (
        <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      bg: "bg-emerald-50",
    },
    {
      label: "Today's Revenue",
      value: `$${dashboardStats.todayRevenue}`,
      change: "+12% vs avg",
      icon: (
        <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      bg: "bg-blue-50",
    },
    {
      label: "This Week",
      value: `$${dashboardStats.weekRevenue.toLocaleString()}`,
      change: "+8% vs last week",
      icon: (
        <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
        </svg>
      ),
      bg: "bg-purple-50",
    },
    {
      label: "Completion Rate",
      value: `${dashboardStats.completionRate}%`,
      change: "Last 30 days",
      icon: (
        <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
        </svg>
      ),
      bg: "bg-amber-50",
    },
  ];

  const statusColors: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Marcus! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-xs text-emerald-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Bookings</h3>
          <span className="text-sm text-gray-400">{todayBookings.length} appointments</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-xs font-semibold uppercase text-gray-400">Client</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase text-gray-400">Service</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase text-gray-400">Date & Time</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase text-gray-400">Amount</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                        {booking.clientName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{booking.clientName}</p>
                        <p className="text-xs text-gray-400">{booking.clientPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{booking.service}</td>
                  <td className="py-3 text-sm text-gray-600">{booking.date} • {booking.time}</td>
                  <td className="py-3 text-sm font-semibold text-gray-800">${booking.amount}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
