export const getType = (objOrVal) =>
  Object.prototype.toString.call(objOrVal).slice(8, -1).toLowerCase();

export const isProd = process.env.NODE_ENV === 'production';
export const isMac = process.platform === 'darwin';
