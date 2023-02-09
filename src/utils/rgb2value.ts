function rgb2value(color: string, opacity: number) {
  const listColor = color.slice(1).split("");
  const values = [];
  if (listColor.length === 3) {
    for (let i = 0; i < 3; ++i) {
      values.push(parseInt(listColor[i], 16) * 16);
    }
  } else if (listColor.length === 6) {
    for (let i = 0; i < 6; i += 2) {
      values.push(parseInt(listColor[i] + listColor[i + 1], 16));
    }
  }
  return values.length ? `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})` : "";
};

export default rgb2value;