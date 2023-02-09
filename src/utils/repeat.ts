function repeat(count: number) {
  return {
    do: (fn: Function) => {
      for (let i = 0; i < count; ++i) {
        fn(i);
      }
    }
  }
}

export default repeat;