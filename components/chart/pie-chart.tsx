'use client';

import Chart from 'react-google-charts';

interface PieChartData {
  title: string;
  data: any[];
}

const PieChart: React.FC<PieChartData> = ({ title, data }) => {
  const topData = data.length > 6 ? data.slice(0, 6) : data;

  const options = {
    legend: 'none',
    pieSliceText: 'label',
    theme: 'maximized',
    chartArea: { top: '5%', height: '90%', left: '5%', width: '90%' },
    colors: ['#3366cc', '#4775d1', '#5c85d6', '#7094db', '#85a3e0'],
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
        height={'400px'}
      />
    </>
  );
};

export default PieChart;
