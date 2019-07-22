// import dayjs from 'dayjs';
import moment from 'moment';
import { Decimal } from 'decimal.js';
import { round } from './math.js';

export function roundUp(num, bit = 2) {
  const precision = 10 ** bit;
  return Math.ceil(num * precision) / precision;
}
// 此方法返回一个向上取整bit位数的字符串，可以防止出现科学计数法
export function roundUpToString(num, bit = 2) {
  const precision = 10 ** bit;
  const tempPrev = Math.ceil(new Decimal(num).times(new Decimal(precision)));
  const temp = new Decimal(tempPrev).div(new Decimal(precision));
  // const temp = Math.ceil(num * precision) / precision;
  return temp.toFixed(bit);
}

// 此方法返回一个向下取整bit位数的字符串，可以防止出现科学计数法

export function roundDownToString(num, bit = 2) {
  const precision = 10 ** bit;
  // const temp = Math.floor(num * precision) / precision;
  const tempPrev = Math.floor(new Decimal(num).times(new Decimal(precision)));
  const temp = new Decimal(tempPrev).div(new Decimal(precision));
  return temp.toFixed(bit);
}

export function roundDown(num, bit = 2) {
  const precision = 10 ** bit;
  return Math.floor(num * precision) / precision;
}

// 数字增加千分位分隔符
export function getNumWithCommas(num, separator = ',') {
  if (typeof num !== 'undefined') {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  } else {
    return '';
  }
}

export function formatDate(date, withTime = true) {
  if (typeof date === 'undefined') {
    return '';
  }
  const m = moment(date);
  if (withTime) {
    return m.format('YYYY-MM-DD HH:mm');
  } else {
    return m.format('YYYY-MM-DD');
  }
}

export function formatMoment(date, format = 'YYYY-MM-DD HH:mm:ss') {
  let result = '';
  if (typeof date !== 'undefined') {
    result = moment(date).format(format);
  }
  return result;
}

export function formatTime(time, format = 'HH:mm:ss') {
  return formatMoment(time, format);
}

export function formatFloat(num, comma = true, fixed = 2) {
  let result = 0;
  if (num !== null && !isNaN(num)) {
    result = num;
  }
  if (typeof fixed !== 'undefined') {
    result = round(result, fixed);
  }
  if (comma) {
    result = getNumWithCommas(result);
  }
  return result;
}

export function formatMoney(value, prefix = '￥', suffix = '', colored = true, fixed = 2) {
  let content = value;
  let style = {};
  if (value) {
    if (value < 0) {
      style = { color: 'red' };
    } else if (colored) {
      style = { color: 'green' };
    }
    const number = formatFloat(value, true, fixed);
    content = <span style={style}>{`${prefix}${number}${suffix}`}</span>;
    // content = (<span style={style} >{number}</span>);
  } else if (value === 0) {
    content = '-';
  }
  const result = <div style={{ textAlign: 'right' }}>{content}</div>;
  return result;
}

export function formatPercent(value, digitNumber = 1) {
  if (typeof value === 'undefined') {
    return '';
  }
  return `${round(value * 100, digitNumber)}%`;
}

// 将日期转换为当日的开始00:00:00 或当日的结束23:59:59
export function setDateToRim(timeStamp, to = 'START') {
  const d = new Date(parseInt(timeStamp, 10));
  if (to === 'START') {
    d.setHours(0, 0, 0);
  } else if (to === 'END') {
    d.setHours(23, 59, 59);
  }
  // 将毫秒清零
  const result = Math.floor(d.getTime() / 1000) * 1000;
  return result;
}

// 格式化数字货币, 默认最多8位小数(不足8位不补零)
export function formatCrypto(num, bit = 8) {
  return formatFloat(num, true, bit);
}
export const formatPhone = text => {
  const str = `${text}`;
  return `${str.substr(0, 3)}-${str.substr(3, 4)}-${str.substr(7, 4)}`;
};

export const rangeTimeProps = {
  format: 'YYYY-MM-DD HH:mm:ss',
  showTime: {
    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
  },
};
