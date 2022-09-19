import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import AIcom from './AIcom';

function ApexChart() {
  const dataChart = useSelector((state) => state.apexChart);
  console.log('dataChart', dataChart);
  const data = {
    series: [
      {
        name: 'Số phút',
        type: 'column',
        data: dataChart.data.x,
      },
      {
        name: 'hài lòng',
        type: 'line',
        data: dataChart.data.y,
      },
    ],
    options: {
      theme: {
        palette: 'palette1' // upto palette10
      },
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: dataChart.name,
      },
      dataLabels: {

        enabled: true,
        enabledOnSeries: [],
      },
      labels: dataChart.options.labels,
      xaxis: {

        type: 'String',
      },
      yaxis: [
        {
          title: {
            text: 'Số phút',
          },
        },
        {
         
          opposite: true,
          title: {
            text: 'hài lòng',
          },
        },
      ],
    },
  };

  return (
    <div className='form'>
      <div id='chart'>
        <Chart
          options={data.options}
          series={data.series}
          type='line'
          height={350}
        />
      <AIcom/>
      </div>
    </div>
  );
}
export default ApexChart;
