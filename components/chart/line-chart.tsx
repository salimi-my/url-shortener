'use client';

import { useTheme } from 'next-themes';
import { Chart } from 'react-google-charts';

interface LineChartData {
  title: string;
  data: any[];
}

const LineChart: React.FC<LineChartData> = ({ title, data }) => {
  const { theme } = useTheme();

  const options = {
    legend: 'none',
    pointSize: 4,
    curveType: 'function',
    theme: 'maximized',
    hAxis: {
      showTextEvery: 2,
      textStyle: { color: theme == 'dark' ? '#ffffff' : '#444444' }
    },
    vAxis: {
      minValue: 0,
      format: '#',
      textStyle: { color: theme == 'dark' ? '#ffffff' : '#444444' },
      baselineColor: theme == 'dark' ? '#dddddd' : '#cccccc',
      minorGridlines: { color: theme == 'dark' ? '#333333' : '#eeeeee' }
    },
    backgroundColor: 'transparent'
  };

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
