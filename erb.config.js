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
