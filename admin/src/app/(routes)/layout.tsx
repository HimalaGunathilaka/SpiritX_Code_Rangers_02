'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', src: '/dashboard.svg' },
    { name: 'Players', href: '/players', src: '/cricket.svg' },
    { name: 'Player Stats', href: '/player-stats', src: '/stats.svg' },
    { name: 'Tournament Summary', href: '/tournament-summary', src: '/cup.svg' },
  ];

  const [session_, setSession_] = useState<Session | null>(null);
  
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(); // Getting the session
      if (!session) {
        router.push("/login"); // Redirecting to sign-in if no session
      } else {
        setSession_(session); // Setting the session to state
      }
    };

    checkSession(); // Calling the session check
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      {session_ &&
      <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-green-600">Spirit11 Admin</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">Admin Panel</span>
              <button
                onClick={handleLogout}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                      ? 'bg-green-50 text-green-700 border-green-500'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent'
                    } group flex items-center px-2 py-2 text-sm font-medium border-l-4 rounded-md`}
                    >
                    <img src={item.src} alt={item.name} className="h-6 w-6 mr-3" />
                    {item.name}
                    </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
      </>}
    </div>
  );
} 