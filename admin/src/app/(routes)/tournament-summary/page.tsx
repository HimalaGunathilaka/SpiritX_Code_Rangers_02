'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TournamentStats {
  totalPlayers: number;
  totalTeams: number;
  totalBudget: number;
  totalPoints: number;
  totalRuns: number;
  totalInnings: number;
  averageRunsPerInnings: number;
  totalWickets: number;
  totalOvers: number;
  totalRunsConceded: number;
  averageRunsPerOver: number;
  topBatsmen: Array<{
    name: string;
    runs: number;
    innings: number;
    average: number;
  }>;
  topBowlers: Array<{
    name: string;
    wickets: number;
    overs: number;
    economy: number;
  }>;
  teamStats: Array<{
    name: string;
    budget: number;
    points: number;
    players: number;
  }>;
}

const defaultStats: TournamentStats = {
  totalPlayers: 0,
  totalTeams: 0,
  totalBudget: 0,
  totalPoints: 0,
  totalRuns: 0,
  totalInnings: 0,
  averageRunsPerInnings: 0,
  totalWickets: 0,
  totalOvers: 0,
  totalRunsConceded: 0,
  averageRunsPerOver: 0,
  topBatsmen: [],
  topBowlers: [],
  teamStats: []
};

const formatNumber = (value: number | null | undefined): string => {
  const num = Number(value) || 0;
  return num.toFixed(2);
};

export default function TournamentSummary() {
  const [stats, setStats] = useState<TournamentStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/tournament');
        if (!response.ok) throw new Error('Failed to fetch tournament stats');
        const data = await response.json();
        
        // Ensure all required properties exist with default values
        const processedData = {
          ...defaultStats,
          totalPlayers: Number(data?.totalPlayers) || 0,
          totalTeams: Number(data?.totalTeams) || 0,
          totalBudget: Number(data?.totalBudget) || 0,
          totalPoints: Number(data?.totalPoints) || 0,
          totalRuns: Number(data?.totalRuns) || 0,
          totalInnings: Number(data?.totalInnings) || 0,
          averageRunsPerInnings: Number(data?.averageRunsPerInnings) || 0,
          totalWickets: Number(data?.totalWickets) || 0,
          totalOvers: Number(data?.totalOvers) || 0,
          totalRunsConceded: Number(data?.totalRunsConceded) || 0,
          averageRunsPerOver: Number(data?.averageRunsPerOver) || 0,
          topBatsmen: (data?.topBatsmen || []).map((batsman: any) => ({
            name: batsman?.name || 'Unknown',
            runs: Number(batsman?.runs) || 0,
            innings: Number(batsman?.innings) || 0,
            average: Number(batsman?.average) || 0
          })),
          topBowlers: (data?.topBowlers || []).map((bowler: any) => ({
            name: bowler?.name || 'Unknown',
            wickets: Number(bowler?.wickets) || 0,
            overs: Number(bowler?.overs) || 0,
            economy: Number(bowler?.economy) || 0
          })),
          teamStats: (data?.teamStats || []).map((team: any) => ({
            name: team?.name || 'Unknown',
            budget: Number(team?.budget) || 0,
            points: Number(team?.points) || 0,
            players: Number(team?.players) || 0
          }))
        };
        
        setStats(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setStats(defaultStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-8 text-gray-900">Loading tournament statistics...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Tournament Summary</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Total Teams</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalTeams}</p>
        </Card>
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Total Players</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalPlayers}</p>
        </Card>
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Total Budget</h3>
          <p className="text-3xl font-bold text-gray-900">${stats.totalBudget.toLocaleString()}</p>
        </Card>
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Total Points</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalPoints}</p>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Tabs defaultValue="batting" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="batting" className="text-gray-900">Batting Stats</TabsTrigger>
          <TabsTrigger value="bowling" className="text-gray-900">Bowling Stats</TabsTrigger>
          <TabsTrigger value="teams" className="text-gray-900">Team Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="batting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Total Runs</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalRuns.toLocaleString()}</p>
            </Card>
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Average Runs/Innings</h3>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.averageRunsPerInnings)}</p>
            </Card>
          </div>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Top Batsmen</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-blue-600">Name</TableHead>
                  <TableHead className="text-blue-600">Runs</TableHead>
                  <TableHead className="text-blue-600">Innings</TableHead>
                  <TableHead className="text-blue-600">Average</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.topBatsmen.map((batsman, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-900">{batsman.name}</TableCell>
                    <TableCell className="text-gray-900">{batsman.runs.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-900">{batsman.innings}</TableCell>
                    <TableCell className="text-gray-900">{formatNumber(batsman.average)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="bowling" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Total Wickets</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalWickets.toLocaleString()}</p>
            </Card>
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Average Runs/Over</h3>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.averageRunsPerOver)}</p>
            </Card>
          </div>

          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Top Bowlers</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-blue-600">Name</TableHead>
                  <TableHead className="text-blue-600">Wickets</TableHead>
                  <TableHead className="text-blue-600">Overs</TableHead>
                  <TableHead className="text-blue-600">Economy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.topBowlers.map((bowler, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-900">{bowler.name}</TableCell>
                    <TableCell className="text-gray-900">{bowler.wickets}</TableCell>
                    <TableCell className="text-gray-900">{formatNumber(bowler.overs)}</TableCell>
                    <TableCell className="text-gray-900">{formatNumber(bowler.economy)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Team Statistics</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-blue-600">Team Name</TableHead>
                  <TableHead className="text-blue-600">Budget</TableHead>
                  <TableHead className="text-blue-600">Points</TableHead>
                  <TableHead className="text-blue-600">Players</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.teamStats.map((team, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-900">{team.name}</TableCell>
                    <TableCell className="text-gray-900">${team.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-900">{team.points}</TableCell>
                    <TableCell className="text-gray-900">{team.players}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 