export const getRandomColor = () => {
  // from 0 to 255 numbers (as in rgb)
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {
    backgroundColor: `rgba(${r},${g},${b}, 0.5)`,
    borderColor: `rgb(${r},${g},${b})`,
  };
};

export const convertValues = (values: {x: string; y: string}) => {
  const valuesX = convertValuesX(values.x);
  const valuesY = convertValuesY(values.y);
  if (valuesX.length !== valuesY.length) {
    const maxLength = Math.min(valuesY.length, valuesX.length);
    return {x: valuesX.slice(0, maxLength), y: valuesY.slice(0, maxLength)};
  }
  return {x: valuesX, y: valuesY};
};

const convertValuesY = (value: string) => {
  return value
    .split(',')
    .map(val => +val)
    .filter(val => !!val);
};

const convertValuesX = (value: string) => {
  return value.split(',');
};

export const getManyColors = (count: number) => {
  const colors = Array.from({length: count}, () => getRandomColor());
  return {
    backgroundColor: colors.map(color => color.backgroundColor),
    borderColor: colors.map(color => color.borderColor),
  };
};
