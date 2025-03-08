import { BarChart, TrendingUp, ArrowUpRight, ArrowDownRight, User, Search, ArrowLeft } from "lucide-react"

export default function PlayerStats() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Player Statistics</h1>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search players..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Player Profile */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold">Amal Perera</h2>
                <p className="text-gray-500">University of Moratuwa</p>
                <div className="flex space-x-2 mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Batsman</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-300">Right Handed</span>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mt-6">
                  <StatBox label="Matches" value="10" />
                  <StatBox label="Runs" value="485" />
                  <StatBox label="Average" value="52.1" />
                </div>

                <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                  Add to Team
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Career Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Batting Style</span>
                  <span>Right Handed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Highest Score</span>
                  <span>98*</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Strike Rate</span>
                  <span>142.8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">50s / 100s</span>
                  <span>4 / 0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sixes / Fours</span>
                  <span>18 / 42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dot Ball %</span>
                  <span>32%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Recent Form</h3>
              </div>
              <div className="space-y-3">
                <FormItem
                  opponent="University of Colombo"
                  date="Mar 15, 2023"
                  performance="72 (48)"
                  isPositive={true}
                />
                <FormItem
                  opponent="University of Peradeniya"
                  date="Mar 10, 2023"
                  performance="45 (32)"
                  isPositive={true}
                />
                <FormItem
                  opponent="University of Jaffna"
                  date="Mar 5, 2023"
                  performance="12 (10)"
                  isPositive={false}
                />
                <FormItem
                  opponent="University of Kelaniya"
                  date="Feb 28, 2023"
                  performance="89 (62)"
                  isPositive={true}
                />
                <FormItem
                  opponent="University of Ruhuna"
                  date="Feb 22, 2023"
                  performance="34 (28)"
                  isPositive={true}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 pb-3">
                <h3 className="text-lg font-semibold">Performance Analytics</h3>
                <p className="text-sm text-gray-500">Detailed breakdown of player statistics</p>
              </div>
              <div className="p-6 pt-0">
                <div className="border-b mb-6">
                  <div className="flex">
                    <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-green-500 text-green-700 font-medium">
                      Batting
                    </button>
                    <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-transparent">
                      Game Phases
                    </button>
                    <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-transparent">
                      Vs Opposition
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg shadow-sm">
                    <div className="p-4 border-b">
                      <h4 className="text-base font-medium">Runs by Match</h4>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                      <BarChart className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Chart visualization</span>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg shadow-sm">
                    <div className="p-4 border-b">
                      <h4 className="text-base font-medium">Strike Rate Trend</h4>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Chart visualization</span>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg shadow-sm md:col-span-2">
                    <div className="p-4 border-b">
                      <h4 className="text-base font-medium">Batting Zones</h4>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
                        <div className="absolute inset-8 border-2 border-gray-300 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300"></div>

                        {/* Sample scoring zones */}
                        <div className="absolute top-1/4 right-1/4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                          32%
                        </div>
                        <div className="absolute bottom-1/4 right-1/4 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                          24%
                        </div>
                        <div className="absolute bottom-1/4 left-1/4 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                          18%
                        </div>
                        <div className="absolute top-1/4 left-1/4 bg-red-500 rounded-full w-14 h-14 flex items-center justify-center text-white font-bold">
                          26%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 pb-3">
                <h3 className="text-lg font-semibold">Match-by-Match Statistics</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Opponent</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Runs</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Balls</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">SR</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">4s</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">6s</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <MatchRow
                        date="Mar 15, 2023"
                        opponent="University of Colombo"
                        runs={72}
                        balls={48}
                        strikeRate={150.0}
                        fours={6}
                        sixes={3}
                        result="Won"
                      />
                      <MatchRow
                        date="Mar 10, 2023"
                        opponent="University of Peradeniya"
                        runs={45}
                        balls={32}
                        strikeRate={140.6}
                        fours={5}
                        sixes={1}
                        result="Won"
                      />
                      <MatchRow
                        date="Mar 5, 2023"
                        opponent="University of Jaffna"
                        runs={12}
                        balls={10}
                        strikeRate={120.0}
                        fours={1}
                        sixes={0}
                        result="Lost"
                      />
                      <MatchRow
                        date="Feb 28, 2023"
                        opponent="University of Kelaniya"
                        runs={89}
                        balls={62}
                        strikeRate={143.5}
                        fours={8}
                        sixes={4}
                        result="Won"
                      />
                      <MatchRow
                        date="Feb 22, 2023"
                        opponent="University of Ruhuna"
                        runs={34}
                        balls={28}
                        strikeRate={121.4}
                        fours={3}
                        sixes={1}
                        result="Lost"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface StatBoxProps {
  label: string;
  value: string;
}

function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-bold text-xl">{value}</p>
    </div>
  )
}

interface FormItemProps {
  opponent: string;
  date: string;
  performance: string;
  isPositive: boolean;
}

function FormItem({ opponent, date, performance, isPositive }: FormItemProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
      <div>
        <p className="font-medium text-sm">{opponent}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div className="flex items-center">
        <span className="font-medium">{performance}</span>
        {isPositive ? (
          <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="ml-1 h-4 w-4 text-red-500" />
        )}
      </div>
    </div>
  )
}

interface PhaseItemProps {
  phase: string;
  runs: number;
  balls: number;
  strikeRate: number;
  average: number;
}

function PhaseItem({ phase, runs, balls, strikeRate, average }: PhaseItemProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{phase}</h4>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-300">
          {strikeRate} SR
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Runs</p>
          <p className="font-medium">{runs}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Balls</p>
          <p className="font-medium">{balls}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Average</p>
          <p className="font-medium">{average}</p>
        </div>
      </div>
    </div>
  )
}

interface DismissalItemProps {
  type: string;
  count: number;
  percentage: number;
}

function DismissalItem({ type, count, percentage }: DismissalItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-md text-center">
      <p className="text-sm font-medium">{type}</p>
      <p className="text-xl font-bold">{count}</p>
      <p className="text-xs text-gray-500">{percentage}%</p>
    </div>
  )
}

interface OppositionItemProps {
  university: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
}

function OppositionItem({ university, matches, runs, average, strikeRate }: OppositionItemProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{university}</h4>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-300">
          {matches} matches
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Runs</p>
          <p className="font-medium">{runs}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Average</p>
          <p className="font-medium">{average}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Strike Rate</p>
          <p className="font-medium">{strikeRate}</p>
        </div>
      </div>
    </div>
  )
}

interface MatchRowProps {
  date: string;
  opponent: string;
  runs: number;
  balls: number;
  strikeRate: number;
  fours: number;
  sixes: number;
  result: string;
}

function MatchRow({ date, opponent, runs, balls, strikeRate, fours, sixes, result }: MatchRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm">{opponent}</td>
      <td className="py-3 px-4 text-sm font-medium">{runs}</td>
      <td className="py-3 px-4 text-sm">{balls}</td>
      <td className="py-3 px-4 text-sm">{strikeRate}</td>
      <td className="py-3 px-4 text-sm">{fours}</td>
      <td className="py-3 px-4 text-sm">{sixes}</td>
      <td className="py-3 px-4 text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            result === "Won" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {result}
        </span>
      </td>
    </tr>
  )
}

