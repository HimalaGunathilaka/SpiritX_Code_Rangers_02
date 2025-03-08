import {
  UsersIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Players',
    value: '120',
    icon: UsersIcon,
    change: '+5%',
    changeType: 'positive',
  },
  {
    name: 'Total Matches',
    value: '45',
    icon: TrophyIcon,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Average Score',
    value: '245',
    icon: ChartBarIcon,
    change: '+8%',
    changeType: 'positive',
  },
  {
    name: 'Tournament Progress',
    value: '75%',
    icon: ArrowTrendingUpIcon,
    change: 'On Track',
    changeType: 'neutral',
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-700">
          Welcome to the Cricket Tournament Admin Panel
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white p-4 shadow"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-2">
                <stat.icon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              </div>
              <p className="ml-12 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-12 flex items-baseline">
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-xs font-semibold ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : stat.changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-base font-medium text-gray-900">Recent Matches</h2>
          <div className="mt-3">
            {/* Add recent matches list here */}
            <p className="text-sm text-gray-500">No recent matches to display</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-base font-medium text-gray-900">Top Performers</h2>
          <div className="mt-3">
            {/* Add top performers list here */}
            <p className="text-sm text-gray-500">No top performers to display</p>
          </div>
        </div>
      </div>
    </div>
  );
} 