import { BookingsTable } from "@/components/admin/bookings-table";

export default function AdminBookingsPage() {
  return (
    <div className="stack-xl">
      <div>
        <h1 className="text-display-sm">Bookings</h1>
        <p className="text-body-sm text-muted-foreground mt-2">
          Client booking requests from your portfolio
        </p>
      </div>

      <BookingsTable />
    </div>
  );
}
