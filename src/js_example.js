const func = async (n) => {
  await Promise.resolve(n);

  return new Promise(res => {
    setTimeout(res, n)
  })
};


func(10);
