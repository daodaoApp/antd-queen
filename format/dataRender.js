// version 1.0.0
// updated: 2017年11月22日17:15:26
import { Tag, Badge } from 'antd';
import { FormattedTime, FormattedDate } from 'react-intl';

import {
  formatDate,
  formatPercent,
  formatMoney,
  getNumWithCommas,
  formatFloat,
  formatMoment,
} from './dataFormatter.js';

/**
 *
 * 将money用两种货币展示
 * @param {*} text render中的text
 * @param {*} record render中的record
 * @param {string} [from='fiat'] text的单位, 法币(fiat)还是数字货币(crypto)
 * @param {number} [bit=8] 货币的小数位数
 * @param {string} [fiatName='USD']
 * @param {string} [currencyNameFiledName='currencyName']  record中数字币名字字段的key
 * @param {string} [exchangeRateFieldName='exchangeName'] record中汇率字段的key
 */

const renderMoneyInBoth = (text, record, from = 'fiat', config) => {
  const getConfig = userConfig => {
    const defaultConfig = {
      bit: 8,
      fiatBit: 2,
      fiatName: 'USD',
      currencyNameFiledName: 'currencyName',
      exchangeRateFieldName: 'exchangeRate',
    };
    return { ...defaultConfig, ...userConfig };
  };

  const { bit, fiatName, currencyNameFiledName, exchangeRateFieldName, fiatBit } = getConfig(
    config,
  );

  const styles = {
    fiat: { color: '#999' },
  };
  const exchangeRate = record[exchangeRateFieldName];
  const currencyName = record[currencyNameFiledName];

  const amount = text;
  let amountInCypto = -1;
  let amountInFiat = -1;

  if (from === 'fiat') {
    amountInCypto = formatFloat(amount / exchangeRate, true, bit);
    amountInFiat = formatFloat(amount, true, fiatBit);
  } else if (from === 'crypto') {
    amountInCypto = formatFloat(amount, true, bit);
    amountInFiat = formatFloat(amount * exchangeRate, true, fiatBit);
  }
  return (
    <div>
      <span>{`${amountInCypto} ${currencyName}`} </span>
      <span style={styles.fiat}> {`≈ ${amountInFiat} ${fiatName}`}</span>
    </div>
  );
};

const renderMoneyFromCrypto = (
  bit = 8,
  fiatName = 'USD',
  currencyNameFiledName = 'currencyName',
  exchangeRateFieldName = 'exchangeRate',
) => {
  return (text, record) => {
    const config = {
      bit,
      fiatName,
      currencyNameFiledName,
      exchangeRateFieldName,
    };
    return renderMoneyInBoth(text, record, 'crypto', config);
  };
};

const renderMoneyFromFiat = (
  bit = 8,
  fiatName = 'USD',
  currencyNameFiledName = 'currencyName',
  exchangeRateFieldName = 'exchangeRate',
) => {
  return (text, record) => {
    const config = {
      bit,
      fiatName,
      currencyNameFiledName,
      exchangeRateFieldName,
    };
    return renderMoneyInBoth(text, record, 'fiat', config);
  };
};

const dataRender = {
  renderTime: (text, record, index) => {
    return formatDate(text, true);
  },
  renderDate: (text, record, index) => {
    return formatDate(text, false);
  },
  renderBool: (text, record, index) => {
    return text ? '是' : '否';
  },
  renderPercent: (text, record, index) => {
    return formatPercent(text, 2);
  },
  renderMoney: (prefix = '￥', suffix = '', colored = true, fixed = 2) => {
    return text => {
      return formatMoney(text, prefix, suffix, colored, fixed);
    };
  },
  renderNumber: text => {
    return getNumWithCommas(text);
  },
  renderFloat: fixed => {
    return text => {
      return formatFloat(text, true, fixed);
    };
  },
  // renderInt: (text) => {
  //   let result = text
  // },
  renderTitle: (text, record, index) => {
    return <span style={{ fontWeight: 'bold' }}>{text}</span>;
  },

  renderTag: (color = 'blue') => {
    return text => {
      return <Tag color={color}>{text}</Tag>;
    };
  },
  renderMoment: (format = 'YYYY-MM-DD HH:mm') => {
    return text => {
      if (text) {
        return formatMoment(text, format);
      } else {
        return '';
      }
    };
  },

  renderPhone: phone => {
    const text = `${phone}`;
    return `${text.substr(0, 3)}-${text.substr(3, 4)}-${text.substr(7, 4)}`;
  },

  // 身份证号脱敏展示
  renderId: text => {
    function genArr(num, content) {
      if (num <= 0) {
        return;
      }
      const result = [];
      for (let i = 0; i < num; i += 1) {
        result.push(content);
      }
      return result;
    }
    if (!text) {
      return;
    }
    const len = text.length;
    if (len < 15) {
      return text;
    } else {
      const head = text.substr(0, 4);
      const tail = text.substr(-4, 4);
      const middle = genArr(len - 8, '*');
      return `${head}${middle.join('')}${tail}`;
    }
  },
  renderSuccessFail: text => {
    let result = text;
    const keywords = {
      success: '成功 已',
      error: '失败 错误',
      warning: '未',
      processing: '正在 审核中',
    };
    const types = Object.keys(keywords);
    for (const type of types) {
      const words = keywords[type].split(/\s+/);
      const regStr = words.map(word => `(${word})`).join('|');
      const reg = new RegExp(regStr, 'g');
      if (reg.test(text)) {
        result = (
          <span>
            <Badge status={type} />
            {text}
          </span>
        );
        return result;
      }
    }
    return result;
  },
  // 渲染多语言支持的日期时间
  renderi18nTime: text => {
    if (text) {
      const props = {
        value: new Date(text),
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      return <FormattedTime {...props} />;
    }
  },
  // 渲染多语言支持的日期时间
  renderi18nDate: text => {
    if (text) {
      const props = {
        value: new Date(text),
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
      };
      return <FormattedDate {...props} />;
    }
  },
  renderMoneyFromCrypto,
  renderMoneyFromFiat,
};

export default dataRender;
