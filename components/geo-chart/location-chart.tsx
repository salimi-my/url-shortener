'use client';

import Chart from 'react-google-charts';

export const options = {
  colorAxis: { minValue: 0, colors: ['#ebf0fa', '#3366cc'] }
};

interface LocationChartData {
  data: any[];
}

const LocationChart: React.FC<LocationChartData> = ({ data }) => {
  return (
    <>
      <p className='font-medium'>Overall traffic</p>
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

export default LocationChart;
