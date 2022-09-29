import { useSelector, useDispatch } from 'react-redux';
import './report.css';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { useState } from 'react';

function AIcom(chartData) {
  const dispatch = useDispatch();
  const dataRenderChart = chartData.chartData.chartData;
  const isShowAICom = useSelector((state) => state.apexChart.AIcom.report);
  const [date, setDate] = useState(new Date().getDate())
  //handleChange
  const handleChange = (e) => {
    setDate(e.target.value);
    

  }

  console.log(date);
  console.log('AICom:', chartData.chartData.chartData);
  
  // filter task toDay
  const now = new Date().toLocaleDateString();
  const toDay = dataRenderChart.filter((task) => {
    const taskTime = new Date(task.updatedAt).toLocaleDateString();
    return now == taskTime;
  });
  console.log(toDay);
  const consvertCreated = (createdAt) => {
    const time12h = new Date(createdAt).toLocaleTimeString('en-GB');
    const formmat24h = time12h.split(':')[0] + ':' + time12h.split(':')[1];
    return formmat24h;
  };
  const chartDay = {
    name: [],
    minutes: [],
    effective: [],
    labelsTime: [],
    notes: [],
    skills: [],
    createdAt: [],
  };

  toDay.map((x) => {
    chartDay.name = [...chartDay.name, x.task.name];
    chartDay.minutes = [...chartDay.minutes, x.task.countDown];
    chartDay.effective = [...chartDay.effective, x.effective];
    chartDay.labelsTime = [...chartDay.labelsTime, x.labelsTime];
    chartDay.notes = [...chartDay.notes, x.notes];
    chartDay.skills = [...chartDay.skills, x.skills];
    chartDay.createdAt = [...chartDay.createdAt, consvertCreated(x.createdAt)];
  });
  // consvert createdAt to 24h hh:mm format

  console.log('toDay: ', chartDay);

  const minutes = chartDay.minutes;
  const effective = chartDay.effective;
  const labelsTime = chartDay.createdAt;
  const maxEffective = Math.max.apply(0, effective);
  const minEffective = Math.min.apply(0, effective);
  const maxMinute = Math.max.apply(0, minutes);
  const minMinute = Math.min.apply(0, minutes);
  const sumMinute = minutes.reduce((sum, minute) => sum + minute, 0);
  const sumEffective = effective.reduce((sum, effective) => sum + effective, 0);
  const avgEffective = sumEffective / effective.length || 0;
  const avgMinute = sumMinute / minutes.length || 0;
  const notes = chartData.chartData.notes;
  const skills = chartData.chartData.skills;

  const dataAIcom = {
    sumMinute: sumMinute,
    sumEffective: sumEffective,
    avgMinute: Math.round(avgMinute * 100) / 100,
    avgEffective: Math.round(avgEffective * 100) / 100,
    minMinute: minMinute,
    maxMinute: maxMinute,
    minEffective: minEffective,
    maxEffective: maxEffective,
    notes: notes,
    skills: skills,
  };

  return (
    <div className='AiCom '>    
      <div
        className='tableResults'
        onClick={() => dispatch(ApexChartActions.AIcom())}
      >
        <div className='p-3 container-taskDetail'>
          <div className='taskName'>
            <span id='spanBaoCao'>Báo cáo</span>
          </div>
          <div id='timeAndEdit'>
            <div className='px-2'>{date}
            {/* {new Date().toDateString()} */}
            </div>
            {/* input date */}
            <input type="date" name="dateTask" id="dateTask"
            value={date}
            onChange={e => handleChange(e)}
            />
          </div>
        </div>
        {isShowAICom ? (
          <div className='row'>
            <table class='table table-striped'>
              <thead>
                <tr class="bg-success">
                  <th scope='col'>Thời gian</th>
                  <th scope='col'>Số Phiên</th>
                  <th scope='col'>Hiệu quả</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-info">
                  <td>{dataAIcom.sumMinute} phút ({Math.floor(dataAIcom.sumMinute/60)}h{dataAIcom.sumMinute%60}')</td>
                  <td>{minutes.length}</td>
                  <td>{dataAIcom.avgEffective}</td>
                </tr>
              </tbody>
            </table>
            {/* 00000000000 */}
            <div className='tableResults--detail'>
              <table class='table table-striped'>
                <thead>
                <tr class="bg-success">
                    <th>Time</th>
                    {/* <th>Thời gian</th> */}
                    {/* <th>Hiệu quả</th> */}
                    <th>Task</th>
                    <th>Skills</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {chartDay.minutes.map((row, id) => {
                    return (
                      <tr key={id} class="table-info">
                        <td>{labelsTime[id]}</td>
                        <td>{chartDay.name[id]}</td>
                        {/* <td>{minutes[id]}</td> */}
                        {/* <td>{effective[id]}</td> */}
                        <td>{chartDay.skills[id]}</td>
                        <td>{chartDay.notes[id]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AIcom;
