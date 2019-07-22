/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { parse } from 'qs';
import router from 'umi/router';
import moment from 'moment';


export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function initializeFilterParams(tableFilterParams: Array<any>) {
  const queryParam = getPageQuery();
  return tableFilterParams.map(v => {
    const { name, tag } = v;
    const value = queryParam[name];
    if (value) {
      v.initValue = value;
    } else if (tag === 'RangePicker') {
      let dateArr = name.split(',');
      const startDateValue = queryParam[dateArr[0]];
      const endDateValue = queryParam[dateArr[1]];
      if (startDateValue && endDateValue) {
        v.initValue = [moment(parseInt(startDateValue, 10)), moment(parseInt(endDateValue, 10))];
      }
    }
    return v;
  });
}

interface IQueryParams {
  pageSize?: number;
  currentPage?: number;
}

export function dealWithQueryParams(params: IQueryParams) {
  let copyParams = Object.assign({}, params);
  const { pageSize, currentPage } = copyParams;
  if (!pageSize) {
    copyParams.pageSize = 10;
  }
  if (!currentPage) {
    copyParams.currentPage = 1;
  }
  return copyParams;
}

export function updateRoute(params: object) {
  router.push({
    pathname: location ? location.pathname : '',
    query: { ...params },
  });
}
