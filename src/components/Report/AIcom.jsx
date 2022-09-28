import { useSelector, useDispatch } from 'react-redux';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { BsFillCalculatorFill } from 'react-icons/bs';
function AIcom(chartData) {
  const dispatch = useDispatch();
  const isShowAICom = useSelector((state) => state.apexChart.AIcom.report);
  // console.log('AIcom data: ', chartData.chartData);
  const minutes = chartData.chartData.minutes;
  const effective = chartData.chartData.effective;
  const labelsTime = chartData.chartData.labelsTime;
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

  const arrRow = [notes, skills];
  return (
    <div className='AiCom '>
      <div
        className='task-detail'
        onClick={() => dispatch(ApexChartActions.AIcom())}
      >
        <div className='p-3 container-taskDetail'>
          <div className='taskName'>
            <span id='taskName'>Báo cáo</span>
          </div>
          <div id='timeAndEdit'>
            <div className='px-2'>{new Date().toDateString()}</div>
            <div className='taskEdit'>
              <img
                id='changeSizeImg'
                src='/caret-down.png'
              />
            </div>
          </div>
        </div>
        {isShowAICom ? (
          <div className='row'>
            <table class='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Thời gian</th>
                  <th scope='col'>Số Phiên</th>
                  <th scope='col'>Hiệu quả</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>0</th>
                  <td>{dataAIcom.sumMinute} phút</td>
                  <td>{minutes.length}</td>
                  <td>{dataAIcom.avgEffective}</td>
                </tr>
              </tbody>
            </table>
            {/* 00000000000 */}
            <table class='table table-striped'>
              <thead>
                <tr>
                  <th>Time</th>
                  {/* <th>Thời gian</th> */}
                  {/* <th>Hiệu quả</th> */}
                  <th>Skills</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {arrRow[1].map((row, id) => {
                  return (
                    <tr key={id}>
                      <td>{labelsTime[id]}</td>
                      {/* <td>{minutes[id]}</td> */}
                      {/* <td>{effective[id]}</td> */}
                      <td>{arrRow[1][id]}</td>
                      <td>{arrRow[0][id]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AIcom;
