interface StatsCardProps {
  label: string;
  value: number | string;
  sub?: string;
}

export function StatsCard({ label, value, sub }: StatsCardProps) {
  return (
    <div className="card card-glass p-6">
      <p className="text-overline mb-3">{label}</p>
      <p className="text-display-md">{value}</p>
      {sub && <p className="text-caption mt-2">{sub}</p>}
    </div>
  );
}
