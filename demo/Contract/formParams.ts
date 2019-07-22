const genInputParam = (name: string) => {
  return {
    title: name,
    tag: 'Input',
    rules: [
      {
        required: true,
        message: `${name}不能为空`,
      },
    ],
    otherProps: {},
  };
};

const formDict = {
  id: genInputParam('合同号'),
  customId: genInputParam('客户编号'),
  type: {
    title: '合同类型',
    options: [
      {
        title: '1',
        name: 'all',
      },
      {
        title: '2',
        name: 'sale',
      },
      {
        title: '3',
        name: 'customer',
      },
    ],
    tag: 'QnSelect',
    rules: [
      {
        required: true,
        message: '合同类型不能为空',
      },
    ],
    otherProps: {
      nameKey: 'title',
      valueKey: 'name',
    },
  },
  customName: genInputParam('客户名称'),
  contactName: genInputParam('联系人'),
  tel: genInputParam('联系方式'),
  email: genInputParam('邮箱'),
  effectiveDate: {
    title: '生效日期',
    tag: 'DatePicker',
    rules: [
      {
        required: true,
        message: '生效日期不能为空',
      },
    ],
  },
  //
  productType: {
    title: '产品类型',
    options: [
      {
        title: '销售',
        name: '1',
      },
      {
        title: '渠道',
        name: '2',
      },
      {
        title: '爱德堡',
        name: '3',
      },
    ],
    tag: 'QnSelect',
    rules: [
      {
        required: true,
        message: '合同类型不能为空',
      },
    ],
    otherProps: {
      nameKey: 'title',
      valueKey: 'name',
    },
  },
  status: {
    title: '合同状态',
    // Normal,Legal,3rd party
    options: [
      {
        title: 'Normal',
        name: 'Normal',
      },
      {
        title: 'Legal',
        name: 'Legal',
      },
      {
        title: '3rdParty',
        name: '3rdParty',
      },
    ],
    tag: 'QnSelect',
    rules: [
      {
        required: true,
        message: '合同状态不能为空',
      },
    ],
    otherProps: {
      nameKey: 'title',
      valueKey: 'name',
    },
  },
  totalAmount: genInputParam('总金额'),
  receivableNum: genInputParam('应收期数'),
  firstPayment: genInputParam('首付款'),
  periodPayment: {
    title: '每期应付',
    // Normal,Legal,3rd party
    options: [
      {
        title: '自动生成',
        name: 'auto',
      },
    ],
    tag: 'QnSelect',
    rules: [
      {
        required: true,
        message: '每期应付不能为空',
      },
    ],
    otherProps: {
      nameKey: 'title',
      valueKey: 'name',
    },
  },
  file: {
    title: '合同文件',
    tag: 'File',
  },
};

const formInitialValueObj = {
  // tagSort: 'portrait',
  // speaker: 'all',
  // recorderType: [],
};

export { formDict, formInitialValueObj };
