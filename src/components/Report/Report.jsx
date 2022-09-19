import { useSelector, useDispatch } from 'react-redux';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
import ApexChart from './ApexChart';
function Report() {
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
  const dataAIcom = {
    sumMinute: sumMinute,
    sumEffective: sumEffective,
    avgMinute: Math.round(avgMinute * 100) / 100,
    avgEffective: Math.round(avgEffective * 100) / 100,
    minMinute: minMinute,
    maxMinute: maxMinute,
    minEffective: minEffective,
    maxEffective: maxEffective,
  };

  return (
    <>
      <ApexChart />
    </>
  );
}

export default Report;
