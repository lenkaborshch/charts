import React, {useState} from 'react';
import Chart, {CustomChartType} from './chart/Chart'
import ControlPanel from './ControlPanel';

export type ValuesType = {x: string; y: string};

const ChartBlock = () => {
  const [type, setType] = useState<CustomChartType>('line');
  const [values, setValues] = useState<ValuesType>({
    x: '',
    y: '',
  });

  return (
    <ControlPanel
      type={type}
      setType={setType}
      values={values}
      onChangeValues={setValues}>
      <Chart type={type} values={values} />
    </ControlPanel>
  );
};

export default ChartBlock;
