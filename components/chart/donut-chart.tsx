'use client';

import { useTheme } from 'next-themes';
import Chart from 'react-google-charts';

interface DonutChartData {
  title: string;
  data: any[];
}

const DonutChart: React.FC<DonutChartData> = ({ title, data }) => {
  const { theme } = useTheme();

  const topData = data.length > 6 ? data.slice(0, 6) : data;

  const options = {
    legend: 'none',
    pieSliceText: 'label',
    pieSliceTextStyle: {
      ...(data.length < 3
        ? { color: theme == 'dark' ? '#ffffff' : '#09090b' }
        : {})
    },
    theme: 'maximized',
    chartArea: {
      top: '5%',
      height: '90%',
      left: '5%',
      width: '90%'
    },
    colors: ['#3366cc', '#4775d1', '#5c85d6', '#7094db', '#85a3e0'],
    pieHole: 0.5,
    backgroundColor: 'transparent'
  };

  return (
    <>
      <p className='font-medium'>{title}</p>
      <Chart
        chartType='PieChart'
        data={topData}
        options={options}
        width={'100%'}
        height={'350px'}
      />
    </>
  );
};

export default DonutChart;
