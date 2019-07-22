import {rangeTimeProps} from '../../utils/format/dataFormatter';

export default [
  {
    tag: 'Input',
    name: 'id',
    title: '合同编号',
    // initValue: undefined,
  },
  {
    tag: 'Input',
    name: 'customId',
    title: '客户编号',
    // initValue: undefined,
  },
  {
    tag: 'Select',
    name: 'productType',
    title: '产品类型',
    initValue: [],
    // otherProps: {mode: 'multiple' },
    // mode: 'multiple',
    options: [
      { label: '直销', value: '直销' },
      { label: '传销', value: '渠道' },
      { label: '爱德堡', value: '爱德堡' },
    ],
  },
  {
    tag: 'Select',
    name: 'type',
    title: '合同类型',
    // initValue: [],
    // otherProps: {mode: 'multiple' },
    // mode: 'multiple',
    options: [{ label: '类型一', value: '1' }, { label: '类型二', value: '2' }],
  },
  {
    tag: 'RangePicker',
    name: 'startDate,endDate',
    title: '生效时间',
    otherProps: rangeTimeProps,
  },
];
