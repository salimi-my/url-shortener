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

interface LineChartData {
  title: string;
  data: any[];
}

const LineChart: React.FC<LineChartData> = ({ title, data }) => {
  return (
    <>
      <p className='font-medium pt-4'>{title}</p>
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

export default LineChart;
