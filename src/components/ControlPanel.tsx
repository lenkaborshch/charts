import React, {ChangeEvent, FC, FocusEvent, KeyboardEvent, useRef} from 'react';
import {ValuesType} from './ChartBlock';
import {CustomChartType} from './chart/Chart';

type ControlPanelProps = {
  type: CustomChartType;
  setType: (type: CustomChartType) => void;
  values: ValuesType;
  onChangeValues: any;
  children: React.ReactNode;
};

const ControlPanel: FC<ControlPanelProps> = ({
  type,
  setType,
  values,
  onChangeValues,
  children,
}) => {
  const refX = useRef<any>(null);
  const refY = useRef<any>(null);

  const onBlurInput = (e: FocusEvent<HTMLInputElement>, type: 'x' | 'y') => {
    if (values[type] !== e.target.value) {
      onChangeValues((prev: ValuesType) => ({...prev, [type]: e.target.value}));
    }
  };

  const onKeyPress = (
    event: KeyboardEvent<HTMLInputElement>,
    type: 'x' | 'y',
  ) => {
    const hasChanged =
      type === 'x'
        ? values.x !== refX.current?.value
        : values.y !== refY.current?.value;
    if (event.key === 'Enter' && hasChanged) {
      onChangeValues((prev: any) => ({
        ...prev,
        [type]: type === 'x' ? refX.current?.value : refY.current?.value,
      }));
    }
  };

  const onChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as CustomChartType);
  };

  return (
    <div className="control">
      <div className="value">
        <label htmlFor="valueX">X axis labels:</label>
        <input
          id="valueX"
          ref={refX}
          onBlur={event => onBlurInput(event, 'x')}
          onKeyDown={event => onKeyPress(event, 'x')}
          className="input"
        />
      </div>
      <div className="value">
        <label htmlFor="valueY">Y axis values:</label>
        <input
          id="valueY"
          ref={refY}
          onBlur={event => onBlurInput(event, 'y')}
          onKeyDown={event => onKeyPress(event, 'y')}
          className="input"
        />
      </div>
      {children}
      <div className="types">
        {availableTypes.map(el => {
          const {id, type: typeName, title} = el;
          return (
            <div className="type">
              <input
                type="radio"
                id={id}
                name={typeName}
                value={typeName}
                checked={type === typeName}
                onChange={onChangeType}
              />
              <label htmlFor={id} className="labelType">
                {title}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const availableTypes = [
  {type: 'bar', id: 'barType', title: 'Bar Chart'},
  {type: 'line', id: 'lineType', title: 'Line Chart'},
  {type: 'radar', id: 'radarType', title: 'Radar Chart'},
  {type: 'pie', id: 'pieType', title: 'Pie Chart'},
  {type: 'doughnut', id: 'doughnutType', title: 'Doughnut Chart'},
  {type: 'polarArea', id: 'polarAreaType', title: 'Polar Area Chart'},
];

export default ControlPanel;
