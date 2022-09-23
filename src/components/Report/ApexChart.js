import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import AIcom from './AIcom';

function ApexChart(chartData) {
 
  console.log('chartData task:', chartData);
//   const chartData ={
//     minutes: [],
//     effective: [],
//     labelsTime:[],

//   };
//  const a =  chartData.map(x => {
//     chartData.minutes = [... chartData.minutes ,x.task.countDown]
//     chartData.effective = [... chartData.effective ,x.effective]
//     chartData.labelsTime = [... chartData.labelsTime ,x.labelsTime]
//   })
//   console.log(chartData);
  const data = {
    series: [
      {
        name: 'Số phút',
        type: 'column',
        data: chartData.minutes,
      },
      {
        name: 'hài lòng',
        type: 'line',
        data: chartData.effective,
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
        text: chartData.name,
      },
      dataLabels: {

        enabled: true,
        enabledOnSeries: [],
      },
      labels: chartData.labelsTime,
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
      {/* <AIcom /> */}
      </div>
    </div>
  );
}
export default ApexChart;
