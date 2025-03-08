import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  BarChart,
  DonutChart,
} from '@tremor/react';

const performance = [
  {
    name: 'Team A',
    runs: 1200,
    wickets: 45,
  },
  {
    name: 'Team B',
    runs: 1100,
    wickets: 38,
  },
  {
    name: 'Team C',
    runs: 980,
    wickets: 42,
  },
  {
    name: 'Team D',
    runs: 1050,
    wickets: 36,
  },
];

const topScorers = [
  { name: 'John Smith', value: 450 },
  { name: 'Mike Johnson', value: 380 },
  { name: 'David Wilson', value: 350 },
  { name: 'James Brown', value: 320 },
];

const topWicketTakers = [
  { name: 'Tom Harris', value: 18 },
  { name: 'Steve Davis', value: 15 },
  { name: 'Chris Evans', value: 14 },
  { name: 'Peter Parker', value: 12 },
];

export default function TournamentSummaryPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Tournament Summary</h1>
        <p className="mt-1 text-sm text-gray-700">
          Overall analysis and statistics of the tournament
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <Title className="text-base">Team Performance</Title>
          <TabGroup>
            <TabList className="mt-3">
              <Tab>Runs</Tab>
              <Tab>Wickets</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BarChart
                  className="mt-3 h-64"
                  data={performance}
                  index="name"
                  categories={['runs']}
                  colors={['blue']}
                />
              </TabPanel>
              <TabPanel>
                <BarChart
                  className="mt-3 h-64"
                  data={performance}
                  index="name"
                  categories={['wickets']}
                  colors={['green']}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>

        <Card className="p-4">
          <Title className="text-base">Tournament Statistics</Title>
          <div className="mt-3 space-y-2">
            <Text className="text-sm">Total Runs: 4,330</Text>
            <Text className="text-sm">Total Wickets: 161</Text>
            <Text className="text-sm">Matches Played: 45</Text>
            <Text className="text-sm">Average Score: 245</Text>
          </div>
        </Card>

        <Card className="p-4">
          <Title className="text-base">Top Run Scorers</Title>
          <DonutChart
            className="mt-3 h-64"
            data={topScorers}
            category="value"
            index="name"
            colors={['blue', 'cyan', 'indigo', 'violet']}
          />
        </Card>

        <Card className="p-4">
          <Title className="text-base">Top Wicket Takers</Title>
          <DonutChart
            className="mt-3 h-64"
            data={topWicketTakers}
            category="value"
            index="name"
            colors={['green', 'emerald', 'teal', 'lime']}
          />
        </Card>
      </div>
    </div>
  );
} 