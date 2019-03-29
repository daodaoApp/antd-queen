// 版本号v1.2.0
// 更新日期 2018年7月20日

import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import {
  Input, Select, DatePicker, InputNumber,
  Collapse, Tag, Form, Checkbox, Switch, Row, Col, Button, Icon, Radio,
} from 'antd';
// TODO 如果需要支持多语言, 把这里改为引用 react-intl中的<FM>
import FormattedMessage from '../FM/FM';
import QnSelect from '../QnSelect/QnSelect';
import './QnFilter.less';
// import { Group } from '../../../node_modules/_antd@2.13.7@antd/lib/radio';
// import log from '../log';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const log = console.log.bind(console);
// const log = () => { };
class QnFilter extends Component {
  constructor(props) {
    super(props);
    // 如果规则中有初始值, 则需要一开始就生成tag
    this.tagDict = this.getInitTagDict(this.props.rules);
    this.state = {
      tags: this.getTags(this.tagDict),
    };
    this.ruleGroups = this.splitRules(this.props.rules, this.props.col);
    // tagDict = {a:{settings,tag}}
    // 存储已经被筛选的tag的数据, 格式{name:{settings,tag}}
  }

  // componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    const isChanged = (name) => {
      return this.props[name] !== nextProps[name];
    };
    if (isChanged('rules') || isChanged('col')) {
      this.ruleGroups = this.splitRules(nextProps.rules, nextProps.col);
      // this.splitedForm = this.getSplitForm(nextProps.rules, nextProps.col);
    }
  }

  getSelectOptions = (data, nameKey = 'name', valueKey = 'id') => {
    const options = [];
    const { Option } = Select;
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i += 1) {
        const name = data[i][nameKey];
        const value = data[i][valueKey];
        const option = (
          <Option key={`${value}`} value={`${value}`}>
            {name}
          </Option>
        );
        options.push(option);
      }
    }
    return options;
  }

  /**
   * 作用:为select控件的值找到对应的名字, 以显示到筛选标签上
   */
  getLabelFromSelectOptions = (value, options, nameKey = 'label', valueKey = 'value', multiple = false) => {
    const findName = (itemValue) => {
      for (let i = 0; i < options.length; i += 1) {
        const option = options[i];
        if (option[valueKey] === itemValue) {
          return option[nameKey];
        }
      }
      return false;
    };

    if (typeof value !== 'undefined' && Array.isArray(options)) {
      if (!multiple) {
        return findName(value);
      } else if (Array.isArray(value) && value.length > 0) {
        const names = [];
        for (let j = 0; j < value.length; j += 1) {
          const name = findName(value[j]);
          if (name) {
            names.push(name);
            if (typeof name === 'string') {
              names.push(',');
            } else {
              // 如果是reactDom对象, 则插入span
              names.push(<span> , </span>);
            }
          }
        }
        names.pop();
        return names;

        // return names.join(<span> , </span>);
        // // 如果是字符串
        // if (typeof names[0] === 'string') {
        //   return names.join(' , ');
        // } else {
        //   // 如果是react对象
        //   return names;
        // }
      } else {
        return false;
      }
    }
  }

  // 生成radio
  getRadio = (rule) => {
    const { options } = rule;
    return (
      <RadioGroup onChange={(e) => { this.handleItemChange(e.target.value, rule); }}>
        {
          options.map((item) => {
            const { value, label } = item;
            return (
              <Radio
                key={item.label}
                value={value}
              >
                {label}
              </Radio>
            );
          })
        }
      </RadioGroup>
    );
  }

  //----------------------------------------------------------------------
  // 用来生成表单的代码
  getInnerSelect = (rule) => {
    // select 和 QnSelect都用QnSelect来处理
    // 如果是select ,要检测额外的参数, 比如nameKey,valueKey,mode(mode=multiple多选)
    // 要对多选的标签显示进行特殊的处理
    const { nameKey, valueKey, mode } = rule;
    const otherProps = rule.otherProps || {};
    const selectProps = {
      nameKey: (typeof nameKey === 'undefined') ? 'label' : nameKey,
      valueKey: (typeof valueKey === 'undefined') ? 'value' : valueKey,
    };
    // let initValue;
    if (mode) {
      selectProps.mode = mode;
    }
    const result = (
      <QnSelect
        options={rule.options}
        width="100%"
        {...selectProps}
        {...otherProps}
        onChange={(value) => {
          // 当mode=multiple时候返回的value为一个数组，要将其转为字符串以免引起异常
          let resultValue = '';
          if (value instanceof Array) {
            resultValue = value.join(',');
          } else {
            resultValue = value;
          }
          this.handleItemChange(resultValue, rule);
        }}
      />);
    return result;
  }

  // 筛选后, 每个筛选项生成一个tag ,本函数用来做这个tag
  getTag = (name, settings) => {
    let result;
    const {
      value, title, tag, otherProps,
    } = settings;
    if (typeof value !== 'undefined' && value !== '' && (Array.isArray(value) ? value.length : true)) {
      let tagValueToShow = value;
      let defaultFormatDate = 'YYYY-MM-DD';
      if (tag === 'RangePicker') {
        if (otherProps) {
          if (otherProps.format) {
            defaultFormatDate = otherProps.format;
          }
        }
        tagValueToShow = `${value[0].format(defaultFormatDate)} - ${value[1].format(defaultFormatDate)}`;
      } else if (moment.isMoment(value)) {
        if (otherProps) {
          if (otherProps.format) {
            defaultFormatDate = otherProps.format;
          }
        }
        tagValueToShow = value.format(defaultFormatDate);
      }
      // 如果是select ,根据select的值找到对应的label, 作为标签显示项
      if (tag === 'Select' || tag === 'QnSelect') {
        tagValueToShow = this.getSelectTagValue(settings);
        if (!tagValueToShow) {
          // 如果多选, 且值为空数组 []
          return;
        }
      }

      const timeStamp = (new Date()).getTime();
      const key = `${name}_${value}_${timeStamp}`;
      result = (
        <Tag
          key={key}
          className="filterTag"
          color="blue"
          closable
          onClose={() => {
            this.handleTagClose(settings);
          }}
        >
          {/* 修改 使得title可以是一个react对象, 而不是仅仅是字符串 */}
          {title}
          {' : '}
          {tagValueToShow}
        </Tag>
      );
    }
    return result;
  }

  // 获取<Select></Select>组件的tag属性值
  getSelectTagValue = (settings) => {
    const { mode, value } = settings;
    const nameKey = settings.nameKey || 'label';
    const valueKey = settings.valueKey || 'value';
    const multiple = (mode === 'multiple');
    const result = this.getLabelFromSelectOptions(value, settings.options, nameKey, valueKey, multiple);
    return result;
  }


  getRangePicker = (rule) => {
    const { otherProps, name } = rule;
    let type = 'time';
    if (otherProps) {
      const { rangeType } = otherProps;
      type = rangeType;
    }
    let result = '';
    switch (type) {
      case 'month':
        result = (
          <RangePicker
            style={{ width: '100%' }}
            {...otherProps}
            onPanelChange={(dateMoment, dateStr) => {
              this.props.form.setFieldsValue({
                [name]: dateMoment,
              });
              this.handleItemChange(dateMoment, rule);
            }}
          />
        );
        break;
      default:
        result = (
          <RangePicker
            style={{ width: '100%' }}
            {...otherProps}
            onChange={(dateMoment, dateStr) => {
              this.handleItemChange(dateMoment, rule);
            }}
          />
        );
        break;
    }
    return result;
  }

  // 用来产生包在getFieldDecorator里面的表单tag
  getInnerHtmlTag = (rule) => {
    if (rule && rule.tag) {
      const otherProps = rule.otherProps || {};
      // otherProps.style = { width: '100%' };
      let innerSelect,
        innerRadio;
      if (rule.tag === 'Select' || rule.tag === 'QnSelect') {
        innerSelect = this.getInnerSelect(rule);
      }

      if (rule.tag === 'Radio') {
        innerRadio = this.getRadio(rule);
      }

      const dict = {
        Input: (
          <Input
            {...otherProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              this.handleItemChange(e.target.value, rule);
            }}
          />),
        DatePicker: (
          <DatePicker
            style={{ width: '100%' }}
            {...otherProps}
            onChange={(dateMoment, dateStr) => {
              this.handleItemChange(dateMoment, rule);
            }}
          />),
        RangePicker: this.getRangePicker(rule),
        InputNumber: (
          <InputNumber
            style={{ width: '100%' }}
            {...otherProps}
            onChange={(value) => {
              this.handleItemChange(value, rule);
            }}
          />
        ),
        Select: innerSelect,
        QnSelect: innerSelect,
        Checkbox: (
          <Checkbox
            {...otherProps}
            onChange={
              (e) => {
                const value = e.target.checked;
                this.handleItemChange(value, rule);
              }
            }
          />
        ),
        Switch: (
          <Switch
            {...otherProps}
            onChange={
              (value) => {
                this.handleItemChange(value, rule);
              }
            }
          />),
        Radio: innerRadio,
      };

      const item = dict[rule.tag];
      return item;
    }
  }

  genFormItem = (rule) => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 13 },
    };
    // const FormItem = Form.Item;
    if (rule && rule.tag) {
      const {
        name, title, initValue: initialValue, required,
      } = rule;
      // console.log(`genFormItem name ${name}  initValue${initialValue}`);
      // 多数控件的值都是value, 而checkbox和 switch的是checked, 在这里根据tag设置valuePropName来完成适配
      let valuePropName = 'value';
      if (rule.tag === 'Switch' || rule.tag === 'Checkbox') {
        valuePropName = 'checked';
      }
      let item = null;
      const innerItem = this.getInnerHtmlTag(rule);
      item = (
        <FormItem
          {...formItemLayout}
          key={name}
          label={title}
        >
          {getFieldDecorator(name, { rules: [{ required, message: '不能为空' }], initialValue, valuePropName })(innerItem)}
        </FormItem>);
      return item;
    }
  }

  genFormItems = (rules) => {
    const formItems = [];
    if (rules) {
      for (let i = 0; i < rules.length; i += 1) {
        formItems.push(this.genFormItem(rules[i]));
      }
    }
    return formItems;
    // log.log('rules', rules);
    // if (Array.isArray(rules) && rules.length > 0) {
    //   return rules.map(rule => this.genFormItem(rule));
    // }
  }
  //----------------------------------------------------------------------

  cleanFormValues = (dataObj) => {
    const cleanData = {};
    const keys = Object.keys(dataObj);
    // log('dataObj', JSON.stringify(dataObj, null, 2))
    for (const key of keys) {
      const value = dataObj[key];
      if (value || value === 0) {
        if (moment.isMoment(value)) {
          cleanData[key] = value.format('x');
        } else if (key.indexOf(',') !== -1) {
          // 时间范围选择器
          const nameArr = key.split(',');
          if (nameArr.length && value.length) {
            const startDateKey = nameArr[0];
            const endDateKey = nameArr[1];
            const startDateValue = value[0].format('x');
            const endDateValue = value[1].format('x');
            cleanData[startDateKey] = startDateValue;
            cleanData[endDateKey] = endDateValue;
          }
        } else {
          cleanData[key] = value;
        }
        // cleanData[key] = value;
      }
    }

    // for (const itemKey in dataObj) {
    //   if (Object.prototype.hasOwnProperty.call(dataObj, itemKey)) {
    //     const itemValue = dataObj[itemKey];
    //     if (typeof itemValue !== 'undefined' && itemValue !== '' && itemValue !== null) {
    //       if (moment.isMoment(itemValue)) {
    //         cleanData[itemKey] = itemValue.format('YYYY-MM-DD');
    //       } else {
    //         cleanData[itemKey] = itemValue;
    //       }
    //     }
    //   }
    // }
    // log('cleanData', cleanData);
    return cleanData;
  }

  handleTagClose = (settings) => {
    const { name, tag, mode } = settings;
    let blankValue;
    switch (tag) {
      case 'QnSelect':
      case 'Select':
        if (mode === 'multiple') {
          blankValue = [];
        } else {
          blankValue = undefined;
        }
        break;
      default:
        break;
    }
    this.props.form.resetFields([name]);
    this.handleItemChange(blankValue, settings);
  }


  handleItemChange = (value, rule) => {
    const { name } = rule;
    const settings = { ...rule, value };
    this.tagDict[name] = {
      settings,
      tag: this.getTag(name, settings),
    };

    this.updateTags(this.tagDict);
    // 清洗数据,并通过回调函数输出
    if (this.props.triggerType !== 'click'
      && typeof this.props.handleChange === 'function') {
      // 此时获取的表单数据中, 没有当前改变的这一项, 所以要手动加进去
      const allValues = this.props.form.getFieldsValue();
      allValues[name] = value;
      this.props.handleChange(this.cleanFormValues(allValues));
    }
  }

  // 如果筛选规则中有初始值, 则要在第一次渲染时就带有tag
  getInitTagDict = (rules) => {
    // 找到有初始值的规则
    const rulesWithInitValue = rules.filter(item => typeof (item.initValue !== 'undefined'));

    const tagDict = {};

    for (let i = 0; i < rulesWithInitValue.length; i += 1) {
      const rule = rulesWithInitValue[i];
      const { name, initValue } = rule;
      const settings = { ...rule, value: initValue };
      // 将数据存入到tagDict
      // 更新this.tagDict
      tagDict[name] = {
        settings,
        tag: this.getTag(name, settings),
      };
    }
    return tagDict;
  }

  // getInitTags = (rules) => {
  //   const tagDict = this.getInitTagDict(rules);

  //   // 返回生成的tags
  //   return this.getTags(tagDict);
  // }

  getTags = (dict) => {
    const tags = [];
    const keys = Object.keys(dict);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const tag = dict[key].tag;
      if (tag) {
        tags.push(tag);
      }
    }
    return tags;
  }

  updateTags = (dict) => {
    const tags = this.getTags(dict);
    this.setState({ tags });
  }

  genArray = (num, content) => {
    if (num > 0) {
      const arr = [];
      for (let i = 0; i < num; i += 1) {
        arr.push(content);
      }
      return arr;
    }
  }

  splitRules = (rules, col = 2) => {
    if (Array.isArray(rules) && rules.length > 0) {
      const result = [];
      for (let cnt = 0; cnt < col; cnt += 1) {
        result.push([]);
      }
      for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i];
        const groupIndex = i % col;
        // log(`i=${i} groupIndex = ${groupIndex}`);
        result[groupIndex].push(rule);
      }
      return result;
    } else {
      return this.genArray(col, undefined);
    }
  }

  clearFilter = () => {
    this.props.form.resetFields();
    this.setState({ tags: [] });
    this.tagDict = {};
    if (typeof this.props.handleChange === 'function') {
      this.props.handleChange({}, 1);
    }
  }
  // getSplitForm = (rules, col = 2) => {
  //   const ruleGroups = this.splitRules(rules, col);
  //   const span = Math.floor(24 / col);
  //   const cols = ruleGroups.map((group, index) => {
  //     return (<Col
  //       key={`fakeKey${index}`}
  //       span={span}
  //     >
  //       {this.genFormItems(group)}
  //     </Col>);
  //   });
  //   return (
  //     <Form>
  //       <Row>
  //         {cols}
  //       </Row>
  //     </Form>);
  // }

  genFilterGroup = (ruleGroups) => {
    if (Array.isArray(ruleGroups) && ruleGroups.length > 0) {
      const col = ruleGroups.length;
      const span = Math.floor(24 / col);
      const cols = ruleGroups.map((group, index) => {
        return (
          <Col
            key={`fakeKey${index}`}
            // key={JSON.stringify(group)}
            span={span}
          >
            {this.genFormItems(group)}
          </Col>);
      });
      return (
        <Form>
          <Row>
            {cols}
          </Row>
        </Form>);
    }
  }

  getBtns = (triggerType, hasClearBtn = true) => {
    const clearBtn = hasClearBtn ? (
      <Button
        className="clearBtn"
        icon="close"
        onClick={this.clearFilter}
      >
        <FormattedMessage id="清空" />
      </Button>) : null;
    const searchBtn = triggerType === 'click'
      ? (
        <Button
          icon="search"
          type="primary"
          onClick={this.handleSearch}
        >
          <FormattedMessage id="查询" />
        </Button>)
      : null;
    return (
      <div className="btn-row">
        {searchBtn}
        {clearBtn}
      </div>);
  }

  handleSearch = () => {
    const query = {};
    const keys = Object.keys(this.tagDict);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = this.tagDict[key].settings.value;
      if (value) {
        query[key] = value;
      }
    }
    // log('query', query);
    const { handleChange, triggerType } = this.props;
    if (triggerType === 'click' && typeof handleChange === 'function') {
      handleChange(query);
    }
  }

  render() {
    const { hasClearBtn, hasCollapse, hasTag } = this.props;

    // TODO 如果一开始就有默认值, 应该先生成一遍tag
    const tagRow = (
      <div className="filterTagWrapper">
        <div className="tagsWrapper">
          {this.state.tags}
        </div>
      </div>
    );

    const content = (
      <div className="QnFilter">
        {this.genFilterGroup(this.ruleGroups)}
        {hasTag && tagRow}
        {this.getBtns(this.props.triggerType, hasClearBtn)}
      </div>
    );
    let result = content;
    if (hasCollapse) {
      const header = (
        <span>
          <Icon type="filter" />
          <FormattedMessage id="筛选" />/
          <FormattedMessage id="查询" />
        </span>
      );
      result = (
        <div className="QnFilter">
          <Collapse defaultActiveKey={['filter']}>
            <Panel
              key="filter"
              header={header}
            >
              {content}
            </Panel>
          </Collapse>
        </div>
      );
    }
    return result;
  }
}

QnFilter.propTypes = {
  handleChange: propTypes.func,
  rules: propTypes.array,
  col: propTypes.number,
  triggerType: propTypes.string,
  hasClearBtn: propTypes.bool,
  hasCollapse: propTypes.bool,
  required: propTypes.bool,
  hasTag: propTypes.bool,
};

QnFilter.defaultProps = {
  handleChange: () => { },
  // triggerType: 'click', // change| click
  triggerType: 'change', // change| click
  col: 4, // 要能被24整除
  rules: [],
  hasClearBtn: true,
  hasCollapse: true,
  required: false, // 是否必要的，是的话前面会有红点
  hasTag: true,
  // rules: [
  // {
  //   tag: 'Input',
  //   name: 'userMobile',
  //   title: '用户手机号',
  //   // initValue: undefined,
  // }, {
  //   tag: 'InputNumber',
  //   name: 'orderCode',
  //   title: '订单编号',
  //   initValue: undefined,
  // },
  // {
  //   tag: 'Select',
  //   name: 'loanChannel',
  //   title: '放款渠道',
  //   initValue: [],
  //   // otherProps: {mode: 'multiple' },
  //   mode: 'multiple',
  //   options: [
  //     { label: '500元', value: '500' },
  //     { label: '1000元', value: '1000' },
  //     { label: '1500元', value: '1500' }],
  // },
  // {
  //   tag: 'Select',
  //   name: 'amount',
  //   title: '订单金额',
  //   // initValue: ['500', '1000', '1500'],
  //   initValue: undefined,
  //   // mode: 'multiple',
  //   options: [
  //     { label: '500元', value: '500' },
  //     { label: '1000元', value: '1000' },
  //     { label: '1500元', value: '1500' },
  //   ],
  // },
  // {
  //   tag: 'DatePicker',
  //   name: 'remitTimeStart',
  //   title: '放款开始:含当天',
  //   initValue: undefined,
  // },
  // {
  //   tag: 'Checkbox',
  //   name: 'checkMe',
  //   title: 'checkMe',
  //   initValue: undefined,
  // },
  // {
  //   tag: 'Switch',
  //   name: 'Switch',
  //   title: 'Switch',
  //   initValue: undefined,
  // },
  // ],
  // filteredRules: [],
};
export default Form.create({})(QnFilter);
