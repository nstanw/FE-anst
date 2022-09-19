import { useSelector, useDispatch } from 'react-redux';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
function AIcom() {
  const data = useSelector((state) => state.apexChart);
  const dispatch = useDispatch();
  console.log('aicom data: ', data);
  const minutes = data.data.x;
  const effective = data.data.y;
  const maxEffective = Math.max.apply(0, effective);
  const minEffective = Math.min.apply(0, effective);
  const maxMinute = Math.max.apply(0, minutes);
  const minMinute = Math.min.apply(0, minutes);
  const sumMinute = minutes.reduce((sum, minute) => sum + minute, 0);
  const sumEffective = effective.reduce((sum, effective) => sum + effective, 0);
  const avgEffective = sumEffective / effective.length || 0;
  const avgMinute = sumMinute / minutes.length || 0;
  const notes = data.feedback.notes;
  const skills = data.feedback.skills;

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
            <span id='taskName'>Báo cáo hôm nay</span>
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
        {data.AIcom.report ? (
          <div className='row'>
            <div className='AiCom__content col-lg-6 col-md-6 col-sm-12'>
              <ul>
                <li>- tổng thời gian học : {dataAIcom.sumMinute}</li>
                <li>
                  - thời gian trung bình: {dataAIcom.avgMinute} (
                  {minutes.length} phiên học)
                </li>
                <li>- thời gian thấp nhất: {dataAIcom.minMinute}</li>
                <li>- thời gian cao nhât: {dataAIcom.maxMinute}</li>
              </ul>
            </div>
            <div className='AiCom__content col-lg-6 col-md-6 col-sm-12'>
              <ul>
                <li>- trung bình hài lòng: {dataAIcom.avgEffective}</li>
                <li>- Điểm hài lòng nhất: {dataAIcom.maxEffective}</li>
                <li>- Điểm hài lòng thấp nhất: {dataAIcom.minEffective} </li>
              </ul>
            </div>
            <div className='AiCom__content col-lg-12 col-md-6 col-sm-12'>
              <ul>
                <li>Đã học được:</li>
                {dataAIcom.skills.map((skill, idx) => {
                  return <ol key={idx}>-- {skill}</ol>;
                })}

                <li>Idie, cảm nhận: </li>
                {dataAIcom.notes.map((note, idx) => {
                  return <ol key={idx}>-- {note}</ol>;
                })}
              </ul>
            </div>
            <div className='AiCom__content col-12'>
              <ul>
                <li>
                  - khoảng thời gian tối ưu nhất để học là: số phút có mức hài
                  lòng cao nhất
                </li>
                <li>
                  - thời điểm hài lòng nhất: điểm hài lòng cao nhất - thời gian
                </li>
                <li>
                  - kết luận: khoảnh thời gian tối ưu nhất cho việc học là : $
                  phút buổi ?sáng thêm icon
                </li>
                <li>
                  - bạn có xu hướng đạt hài lòng cao lúc: mới giữa sau khi học.
                  hiệu quả hơn bao nhiêu %
                </li>
                <li>
                  - khoảng thời gian thích hợp nhất cho bạn là: thời gian có
                  hiệu quả cao nhất
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AIcom;
