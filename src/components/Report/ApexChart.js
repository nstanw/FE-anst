import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import AIcom from './AIcom';

function ApexChart(chartData) {
    const dataRenderChart = chartData.chartData.chartData;

    // filter task toDay
    const now = new Date().toLocaleDateString();
    const toDay = dataRenderChart.filter((task) => {
      const taskTime = new Date(task.updatedAt).toLocaleDateString();
      return now == taskTime;
    });
    //consvertCreated to date
    const consvertCreated = (createdAt) => {
      const time12h = new Date(createdAt).toLocaleTimeString('en-GB');
      const formmat24h = time12h.split(':')[0] + ':' + time12h.split(':')[1];
      return formmat24h;
    };
    const chartDay = {
      minutes: [],
      effective: [],
      labelsTime: [],
      notes: [],
      skills: [],
      createdAt: [],
    };

    dataRenderChart.map((x) => {
      chartDay.minutes = [...chartDay.minutes, x.task.countDown];
      chartDay.effective = [...chartDay.effective, x.effective];
      chartDay.labelsTime = [...chartDay.labelsTime, x.labelsTime];
      chartDay.notes = [...chartDay.notes, x.notes];
      chartDay.skills = [...chartDay.skills, x.skills];
      chartDay.createdAt = [
        ...chartDay.createdAt,
        consvertCreated(x.createdAt),
      ];
    });
    // toDay.map((x) => {
    //   chartDay.minutes = [...chartDay.minutes, x.task.countDown];
    //   chartDay.effective = [...chartDay.effective, x.effective];
    //   chartDay.labelsTime = [...chartDay.labelsTime, x.labelsTime];
    //   chartDay.notes = [...chartDay.notes, x.notes];
    //   chartDay.skills = [...chartDay.skills, x.skills];
    //   chartDay.createdAt = [
    //     ...chartDay.createdAt,
    //     consvertCreated(x.createdAt),
    //   ];
    // });
    // consvert createdAt to 24h hh:mm format
    
  const data = {
    series: [
      {
        name: 'Số phút',
        type: 'column',
        data: chartDay.minutes,
      },
      {
        name: 'hài lòng',
        type: 'line',
        data: chartDay.effective,
      },
    ],
    options: {
      theme: {
        palette: 'palette1', // upto palette10
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
      colors: ['#a3d769', '#ff0000'],
      dataLabels: {
        enabled: true,
        // enabledOnSeries: [1],
      },
      labels: chartDay.createdAt,
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
