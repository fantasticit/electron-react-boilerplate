module.exports = {
  port: 31323,
  windows: [
    {
      name: 'main',
      isMain: true,
      title: '主窗口',
    },
    {
      name: 'multiple',
      multiple: true,
      title: '可多开窗口',
    },
    {
      name: 'update',
      title: '更新窗口',
      width: 400,
      parent: 'main',
      modal: false, // 模态窗在 mac 系统上无法关闭
    },
    {
      name: 'picture',
      width: 600,
      heigh: 300,
      title: '图片查看',
    },
  ],
};

function rememberAndUpdateState(initialVal) {
  let val = initialVal;

  return (() => {
    const setter = () => {
      val = initialVal;
    };
    return [val, setter];
  })();
}

function hit() {
  var [count, setCount] = rememberAndUpdateState(0);

  count++;
  setCount(count);

  console.log(`Hit count: ${count}`);
}
