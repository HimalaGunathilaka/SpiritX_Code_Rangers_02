'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Players', href: '/players', icon: UserGroupIcon },
  { name: 'Player Stats', href: '/player-stats', icon: ChartBarIcon },
  { name: 'Tournament Summary', href: '/tournament-summary', icon: TrophyIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 mb-8">
          <span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CT</span>
          </span>
          <h1 className="text-lg font-bold">Cricket Tournament</h1>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-3">
        <div className="flex items-center gap-3">
          <img
            className="h-8 w-8 rounded-full"
            src="https://via.placeholder.com/32"
            alt="Admin avatar"
          />
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 