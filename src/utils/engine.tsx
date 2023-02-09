/**
 * 返回一个记录动画帧播放的对象
 * @param fn 回调
 * @returns 装箱化的数字
 */
function engine(fn: Function) {
  const ref = { id: 0 };
  const cycle = (timeStepLast: number) => {
    fn(timeStepLast);
    ref.id = requestAnimationFrame(cycle);
  };
  ref.id = requestAnimationFrame(cycle);
  return ref;
}

export default engine;