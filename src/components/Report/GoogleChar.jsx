import { Chart } from 'react-google-charts';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

function GoogleChar() {
  const chart = useSelector((state) => state.chart);
  console.log("chart", chart);
  const data = chart.data;

  return (
    <motion.div
      className='study row'
      initial={{ w: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=''>
        <Chart
          chartType={chart.chartType}
          width={chart.width}
          height={chart.height}
          data={data}
        />
      </div>
    </motion.div>
  );
}

export default GoogleChar;
