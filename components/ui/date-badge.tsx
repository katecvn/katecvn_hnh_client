interface DateBadgeProps {
  date: string | Date; // chấp nhận chuỗi ISO hoặc đối tượng Date
}

export function DateBadge({ date }: DateBadgeProps) {
  const createdDate = new Date(date);

  const day = createdDate.getDate().toString().padStart(2, '0');

  const monthNum = Number(
    createdDate.toLocaleString('vi-VN', { month: 'numeric' })
  );
  const month = `Th${monthNum < 10 ? '0' + monthNum : monthNum}`;

  return (
    <div className="absolute top-2 left-2 font-sans font-bold bg-green-cyan-600 text-white text-center rounded-xs p-1.5 leading-tight shadow">
      <span className="block text-base/18 ">{day}</span>
      <span className="block text-xs">{month}</span>
    </div>
  );
}
