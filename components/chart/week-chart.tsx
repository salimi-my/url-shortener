'use client';

import { Chart } from 'react-google-charts';

export const options = {
  legend: 'none',
  pointSize: 4,
  curveType: 'function',
  theme: 'maximized',
  hAxis: { showTextEvery: 2 },
  vAxis: { minValue: 0, format: '#' }
};

interface WeekChartData {
  data: any[];
}

const WeekChart: React.FC<WeekChartData> = ({ data }) => {
  return (
    <>
      <p className='font-medium pt-4'>Number of hits : Last 7 days</p>
      <Chart
        className='mt-4'
        chartType='LineChart'
        width='100%'
        height='300px'
        data={data}
        options={options}
      />
    </>
  );
};

export default WeekChart;
