import LineChart from '@/components/chart/line-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StatisticChartData {
  weekData: any[];
  monthData: any[];
  allTimeData: any[];
}

const StatisticChartsTabs: React.FC<StatisticChartData> = ({
  weekData,
  monthData,
  allTimeData
}) => {
  return (
    <Tabs defaultValue='week' className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='week'>Last 7 days</TabsTrigger>
        <TabsTrigger value='month'>Last 30 days</TabsTrigger>
        <TabsTrigger value='all'>All time</TabsTrigger>
      </TabsList>
      <TabsContent value='week'>
        <LineChart title='Number of hits: Last 7 days' data={weekData} />
      </TabsContent>
      <TabsContent value='month'>
        <LineChart title='Number of hits: Last 30 days' data={monthData} />
      </TabsContent>
      <TabsContent value='all'>
        <LineChart title='Number of hits: All time' data={allTimeData} />
      </TabsContent>
    </Tabs>
  );
};

export default StatisticChartsTabs;
