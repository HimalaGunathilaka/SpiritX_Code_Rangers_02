import {
  Card,
  Title,
  TextInput,
  Select,
  SelectItem,
  BarChart,
} from '@tremor/react';

const playerStats = [
  {
    id: 1,
    name: 'John Smith',
    team: 'University A',
    matches: 15,
    runs: 450,
    wickets: 0,
    average: 30.0,
    strikeRate: 125.0,
    highestScore: 85,
    fifties: 3,
    hundreds: 0,
  },
  // Add more sample player stats here
];

const teams = [
  'All Teams',
  'University A',
  'University B',
  'University C',
  'University D',
];

export default function PlayerStatsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Player Statistics</h1>
        <p className="mt-2 text-sm text-gray-700">
          Detailed statistics for all players in the tournament
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <TextInput placeholder="Search players..." />
        </div>
        <div>
          <Select placeholder="Select team">
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Title>Batting Performance</Title>
          <BarChart
            className="mt-4 h-80"
            data={playerStats}
            index="name"
            categories={['runs']}
            colors={['blue']}
          />
        </Card>

        <Card>
          <Title>Bowling Performance</Title>
          <BarChart
            className="mt-4 h-80"
            data={playerStats}
            index="name"
            categories={['wickets']}
            colors={['green']}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <Title>Detailed Statistics</Title>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Player
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Team
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Matches
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Runs
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Average
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Strike Rate
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Highest Score
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        50s/100s
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Wickets
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {playerStats.map((player) => (
                      <tr key={player.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {player.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.team}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.matches}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.runs}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.average}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.strikeRate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.highestScore}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.fifties}/{player.hundreds}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {player.wickets}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 