const func = async (n: number) => {
  await Promise.resolve(n);

  return new Promise(res => {
    setTimeout(res, n)
  })
};


func(10);
