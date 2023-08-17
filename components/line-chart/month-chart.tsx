'use client';

import { Chart } from 'react-google-charts';

export const options = {
  legend: 'none',
  pointSize: 4,
  curveType: 'function',
  theme: 'maximized',
  hAxis: { showTextEvery: 3 },
  vAxis: { minValue: 0, format: '#' }
};

interface MonthChartData {
  data: any[];
}

const MonthChart: React.FC<MonthChartData> = ({ data }) => {
  return (
    <>
      <p className='font-medium pt-4'>Number of hits : Last 30 days</p>
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

export default MonthChart;
