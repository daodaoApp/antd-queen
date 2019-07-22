export function getWith(typicalMax) {
  const defaultWidth = 150;
  if (typicalMax) {
    // 一个汉字/全角字符的宽度大概等于两个半半角字符 ,所以用xx.来代替
    // const str = typicalMax.replace(/[^\x00-\xff]/g, 'xx.');
    const str = typicalMax.replace(/[^\x00-\xff]/g, 'xx-');
    // log(str);
    return Math.round((str.length * 185) / 25, 0);
  } else {
    return defaultWidth;
  }
}

export function genTableColumns(dict, keys) {
  // log('dict', dict);
  let result = {};
  if (dict) {
    const keyArr = keys || Object.keys(dict);
    // log('keyArr', keyArr);
    const columns = keyArr.map(key => {
      // log('key', key);
      const { title, render, typicalMax, className } = dict[key];
      const width = typicalMax ? getWith(typicalMax) : dict[key].width;
      // log(key, width);
      return {
        title,
        width,
        render,
        key,
        dataIndex: key,
        className,
      };
    });
    result = columns;
  }
  return result;
}
