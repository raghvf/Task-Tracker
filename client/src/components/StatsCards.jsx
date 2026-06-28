import { ListTodo, Clock, CheckCircle2, CircleDot } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="glass rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
      <div
        className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

const StatsCards = ({ statistics }) => {
  const cards = [
    {
      title: 'Total Tasks',
      value: statistics.total,
      icon: ListTodo,
      color: 'text-primary',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
    },
    {
      title: 'Pending',
      value: statistics.pending,
      icon: CircleDot,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/40',
    },
    {
      title: 'In Progress',
      value: statistics.inProgress,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    },
    {
      title: 'Completed',
      value: statistics.completed,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default StatsCards;
