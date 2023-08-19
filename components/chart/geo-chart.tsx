'use client';

import Chart from 'react-google-charts';

export const options = {
  colorAxis: { minValue: 0, colors: ['#ebf0fa', '#3366cc'] },
  backgroundColor: 'transparent'
};

interface GeoChartData {
  title: string;
  data: any[];
}

const GeoChart: React.FC<GeoChartData> = ({ title, data }) => {
  return (
    <>
      <p className='font-medium'>{title}</p>
      <Chart
        chartType='GeoChart'
        width='100%'
        height='400px'
        data={data}
        options={options}
      />
    </>
  );
};

export default GeoChart;
