export default function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="border rounded-xl p-6 flex items-center justify-between min-h-[110px] shadow-sm hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${bg}`}>
        <Icon size={40} className={color} />
      </div>
    </div>
  );
}