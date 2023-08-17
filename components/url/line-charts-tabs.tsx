import WeekChart from '@/components/line-chart/week-chart';
import MonthChart from '@/components/line-chart/month-chart';
import AllTimeChart from '@/components/line-chart/all-time-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WeekChartData {
  weekData: any[];
  monthData: any[];
  allTimeData: any[];
}

const LineChartsTabs: React.FC<WeekChartData> = ({
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
        <WeekChart data={weekData} />
      </TabsContent>
      <TabsContent value='month'>
        <MonthChart data={monthData} />
      </TabsContent>
      <TabsContent value='all'>
        <AllTimeChart data={allTimeData} />
      </TabsContent>
    </Tabs>
  );
};

export default LineChartsTabs;
