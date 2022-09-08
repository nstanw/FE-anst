import { Chart } from 'react-google-charts';
function Report() {
  const data = [
    ['Element', 'Time', { role: 'style' }],
    ['Mon', 8.94, '#b87333'], // RGB value
    ['Tue', 10.49, 'silver'], // English color name
    ['Wed', 19.3, 'gold'],
    ['Thu', 21.45, 'color: #e5e4e2'], // CSS-style declaration
    ['Fri', 29.45, 'color: #e5e4e2'], // CSS-style declaration
    ['Sat', 41.45, 'color: #e5e4e2'], // CSS-style declaration
    ['Sun', 21.45, 'color: #e5e4e2'], // CSS-style declaration
  ];
  const mouths = [
    ['Ngày', 'Giờ'],

    [1, Math.random() * 10],
    [2, Math.random() * 10],
    [3, Math.random() * 10],
    [4, Math.random() * 10],
    [5, Math.random() * 10],
    [6, Math.random() * 10],
    [7, Math.random() * 10],
    [8, Math.random() * 10],
    [9, Math.random() * 10],
    [10, Math.random() * 10],
    [11, Math.random() * 10],
    [12, Math.random() * 10],
    [13, Math.random() * 10],
    [14, Math.random() * 10],
    [15, Math.random() * 10],
    [16, Math.random() * 10],
    [17, Math.random() * 10],
    [18, Math.random() * 10],
    [19, Math.random() * 10],
    [20, Math.random() * 10],
    [21, Math.random() * 10],
    [22, Math.random() * 10],
    [23, Math.random() * 10],
    [24, Math.random() * 10],
    [25, Math.random() * 10],
    [26, Math.random() * 10],
    [27, Math.random() * 10],
    [28, Math.random() * 10],
    [29, Math.random() * 10],
    [30, Math.random() * 10],
  ];

  const options = {
    title: 'Mouths',
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
    isStacked: true,
    height: 400,
    legend: { position: 'top', maxLines: 3 },
    vAxis: { minValue: 1 },
  };



  return (
    <div className='row'>
        <div className='text-center font-weight-bold display-1'>
        <h1>REPORT</h1>
        </div>
      <div className='col-lg-6 col-md-6 col-sm-12'>
        <Chart
          chartType='ColumnChart'
          width='100%'
          height='400px'
          data={data}
 
        />
      </div>
      <div className='col-lg-6 col-md-6 col-sm-12'>
        <Chart
          chartType='AreaChart'
          width='100%'
          height='400px'
          data={mouths}
          options={options}
        />
      </div>
    </div>
  );
}

export default Report;
