"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingRow {
  id: string;
  booking_type: string;
  project_title: string | null;
  name: string;
  email: string;
  phone: string;
  country: string;
  project_type: string;
  budget: string;
  deadline: string | null;
  description: string;
  status: string;
  created_at: string;
}

export function BookingsTable() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="card card-glass p-12 text-center">
        <p className="text-body-sm text-muted-foreground">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="card card-glass overflow-hidden">
      <table className="w-full text-left text-body-sm">
        <thead>
          <tr className="border-b border-white/8 text-overline">
            <th className="px-6 py-4 font-normal">Client</th>
            <th className="px-6 py-4 font-normal">Type</th>
            <th className="px-6 py-4 font-normal">Project</th>
            <th className="px-6 py-4 font-normal">Budget</th>
            <th className="px-6 py-4 font-normal">Status</th>
            <th className="px-6 py-4 font-normal">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-white/5 hover:bg-white/3">
              <td className="px-6 py-4">
                <p className="font-medium">{b.name}</p>
                <p className="text-caption text-muted-foreground">{b.email}</p>
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {b.booking_type === "exact_design" ? "Exact Design" : "New Project"}
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {b.project_title ?? b.project_type}
              </td>
              <td className="px-6 py-4">{b.budget}</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-white/8 px-2 py-0.5 text-caption capitalize">
                  {b.status}
                </span>
              </td>
              <td className="px-6 py-4 text-caption text-muted-foreground">
                {new Date(b.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
