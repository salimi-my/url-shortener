import WeekChart from '@/components/chart/week-chart';
import MonthChart from '@/components/chart/month-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WeekChartData {
  weekData: any[];
  monthData: any[];
}

const LineChartsTabs: React.FC<WeekChartData> = ({ weekData, monthData }) => {
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
      <TabsContent value='all'>All time chart</TabsContent>
    </Tabs>
  );
};

export default LineChartsTabs;
