import React, {FC} from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartType,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  BarElement,
  RadialLinearScale,
} from 'chart.js';
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2';
import {convertValues, getManyColors, getRandomColor} from './utils';
import {ValuesType} from '../ChartBlock';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  RadialLinearScale,
);

export type CustomChartType = Omit<ChartType, 'scatter' | 'bubble'>;
type ChartProps = {
  type: CustomChartType;
  values: ValuesType;
};

const Chart: FC<ChartProps> = ({type, values}) => {
  // @ts-ignore
  const {component: Component, manyColors} = dataTypesCharts[type];
  const data = getData(type, values, manyColors);
  return <Component data={data as any} />;
};

const getData = (
  type: CustomChartType,
  values: {x: string; y: string},
  manyColors: boolean,
) => {
  const formatValues = convertValues(values);
  const {backgroundColor, borderColor} = manyColors
    ? getManyColors(formatValues.y.length)
    : getRandomColor();
  return {
    labels: formatValues.x,
    datasets: [
      {
        label: '',
        data: formatValues.y,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      },
    ],
  };
};

export const dataTypesCharts = {
  bar: {
    component: Bar,
    manyColors: false,
  },
  line: {
    component: Line,
    manyColors: false,
  },
  radar: {
    component: Radar,
    manyColors: false,
  },
  pie: {
    component: Pie,
    manyColors: true,
  },
  doughnut: {
    component: Doughnut,
    manyColors: true,
  },
  polarArea: {
    component: PolarArea,
    manyColors: true,
  },
};

export default Chart;
