import { useSelector, useDispatch } from 'react-redux';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { BsFillCalculatorFill } from 'react-icons/bs';
function AIcom(chartData) {
  const dispatch = useDispatch();
  const isShowAICom = useSelector(state => state.apexChart.AIcom.report)
  console.log('AIcom data: ', chartData.chartData);
  const minutes = chartData.chartData.minutes;
  const effective = chartData.chartData.effective;
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
            <div className='AiCom__content col-lg-12 col-md-12 col-sm-12'>
              <ul>
                <li> Hôm nay học được: {dataAIcom.sumMinute} phút.</li>
                <li>                
                  Trung bình mỗi phiên {dataAIcom.avgMinute} ({minutes.length}{' '}
                  phiên học)
                </li>
                <li> Hiệu quả: {dataAIcom.avgEffective}</li>
              </ul>
            </div>
            <div className='AiCom__content col-lg-6 col-md-6 col-sm-12'>
              <ul>
                <li>Đã học được:</li>
                {dataAIcom.skills.map((skill, idx) => {
                  return <ol key={idx}>- {skill}</ol>;
                })}
              </ul>
            </div>
            <div className='AiCom__content col-lg-6 col-md-6 col-sm-12'>
              <ul>
                <li>Idie, cảm nhận: </li>
                {dataAIcom.notes.map((note, idx) => {
                  return <ol key={idx}>- {note}</ol>;
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AIcom;
