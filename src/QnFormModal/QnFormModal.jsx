/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import {
  Modal,
  Button,
  Input,
  InputNumber,
  DatePicker,
  Form,
  Tooltip,
  Icon,
  Spin,
  Row,
  Col,
} from 'antd';
import QnSelect from '../QnSelect/QnSelect.jsx';
import QnListTagAdder from '../QnListTagAdder/QnListTagAdder.jsx';
import QnUpload from '../QnUpload/QnUpload.jsx';
// import './QnFormModal.less';
const log = console.log.bind(console);
const FormItem = Form.Item;

class QnFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // const isChanged = (name) => {
    //   return (this.props[name] !== nextProps[name]);
    // };
    // if (isChanged('formDict')) {
    // }
  }

  handleTriggerBtnClick = () => {
    const { handleTriggerClick, isShow } = this.props;

    if (typeof handleTriggerClick === 'function') {
      handleTriggerClick();
    }

    if (typeof isShow === 'function') {
      if (isShow()) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    } else if (!isShow) {
      this.setState({ visible: true });
    }
  };

  handleModalOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        if (typeof this.props.handleOk === 'function') {
          const result = this.props.handleOk(values);
          if (result instanceof Promise) {
            result.then(() => {
              this.handleOkAfterSubmit();
            });
          } else {
            this.handleOkAfterSubmit();
          }
        }
      }
    });
  };

  handleOkAfterSubmit = () => {
    if (this.props.ifResetAfterSuccess) {
      this.props.form.resetFields();
    }
    this.setState({ visible: false });
  };

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  };

  genFormItem = (itemData, dataDict, initialValueObj) => {
    const { getFieldDecorator } = this.props.form;
    const inputLayout = {
      style: { width: '100%' },
    };

    const { rowsNumber } = this.props;

    // log('itemData', itemData);
    const name = typeof itemData === 'string' ? itemData : itemData.name;
    // const { name } = itemData;

    const { tag, title } = dataDict[name];
    const rules = dataDict[name].rules || [];

    const otherPropsOfForm = typeof itemData.otherProps === 'undefined' ? {} : itemData.otherProps;
    const otherPropsOfDict =
      typeof dataDict[name].otherProps === 'undefined' ? {} : dataDict[name].otherProps;
    const itemProps = { ...inputLayout, ...otherPropsOfDict, ...otherPropsOfForm };
    // log('itemProps', { ...otherPropsOfDict, ...otherPropsOfForm });
    const formPartDict = {
      Input: <Input {...itemProps} />,
      InputNumber: <InputNumber {...itemProps} />,
      DatePicker: <DatePicker {...itemProps} />,
      QnSelect: <QnSelect {...itemProps} options={dataDict[name].options} />,
      Select: <QnSelect {...itemProps} options={dataDict[name].options} />,
      QnListTagAdder: <QnListTagAdder {...itemProps} />,
      File: <QnUpload {...itemProps} />,
    };

    const formPart = formPartDict[tag];
    // 空对象在索引不存在的key值时, 会返回undefined ,但null和undefind若索引会报错并卡死
    const initialValue = initialValueObj || {};
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };

    return (
      <Col span={Math.ceil(24 / rowsNumber)} key={name}>
        <FormItem {...formItemLayout} label={title}>
          {getFieldDecorator(name, {
            // valuePropName: 'value',
            initialValue:
              typeof initialValue[name] === 'undefined' ? undefined : initialValue[name],
            rules,
          })(formPart)}
        </FormItem>
      </Col>
    );
  };

  genFormItems = (itemDataArr, dataDict, initialValueObj, rowSplitTitleDict) => {
    if (Array.isArray(itemDataArr) && itemDataArr.length > 0) {
      const items = [];
      for (let i = 0; i < itemDataArr.length; i += 1) {
        if (rowSplitTitleDict) {
          if (rowSplitTitleDict[i]) {
            items.push(
              <Col span={24} style={{ paddingBottom: '10px' }} key={i}>
                {i !== 0 ? <hr style={{ marginBottom: '20px' }} /> : ''}
                <b>{rowSplitTitleDict[i]}</b>
              </Col>,
            );
          }
        }
        items.push(this.genFormItem(itemDataArr[i], dataDict, initialValueObj));
      }
      return <Row>{items}</Row>;
    }
  };

  getAllFormItemsFromDict = dict => {
    const items = [];
    for (const itemKey in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, itemKey)) {
        items.push({ name: itemKey });
      }
    }
    return items;
  };

  render() {
    const {
      triggerType,
      buttonProps,
      formItems,
      formInitialValueObj,
      hasTooltip,
      title,
      ifShowFormLoading,
      formDict,
      triggerTitle,
      otherProps,
      width,
      rowSplitTitleDict,
    } = this.props;

    let trigger = null;
    if (triggerType === 'button') {
      trigger = (
        <Button {...buttonProps} className="triggerBtn" onClick={this.handleTriggerBtnClick}>
          {buttonProps.title}
        </Button>
      );
    } else if (triggerType === 'a') {
      trigger = <a onClick={this.handleTriggerBtnClick}>{triggerTitle}</a>;
    }

    const itemDataArr = formItems || this.getAllFormItemsFromDict(formDict);
    const formItemData = this.genFormItems(
      itemDataArr,
      formDict,
      formInitialValueObj,
      rowSplitTitleDict,
    );

    return (
      <span className="QnFormModal">
        {hasTooltip ? <Tooltip title={title}>{trigger}</Tooltip> : trigger}
        <Modal
          className="mainModal"
          title={title}
          visible={this.state.visible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          maskClosable={false}
          width={width}
          closable
          {...otherProps}
        >
          <Spin spinning={ifShowFormLoading}>{formItemData}</Spin>
        </Modal>
      </span>
    );
  }
}
QnFormModal.propTypes = {};
QnFormModal.defaultProps = {
  title: '打开modal',
  triggerType: 'button', // 触发器的样式 可以是button | a,
  triggerTitle: (
    <span>
      <Icon type="edit" />
      打开modal
    </span>
  ),
  buttonProps: {
    type: 'primary',
    icon: 'plus',
    title: <Icon type="rocket" />,
  },
  handleTriggerClick: null,
  isShow: null,
  handleOk: () => {},
  // formItems:格式
  // [
  //   {
  //     name: 'tagName',
  //     otherProps: {},
  //   },
  //   {
  //     name: 'tagSort',
  //   },
  //   {
  //     name: 'speaker',
  //   },
  // ];
  formItems: null,
  // formItems 格式
  // tagSort: {
  //   title: '标签分类',
  //   options: [
  //     {
  //       title: '客户画像',
  //       name: "portrait",
  //     },
  //     {
  //       title: '客户资料',
  //       name: "info",
  //     },
  //     {
  //       title: '话术标签',
  //       name: "tag",
  //     },
  //   ],
  //   tag: 'QnSelect',
  //   rules: [
  //     {
  //       required: true,
  //       message: '标签分类不能为空',
  //     },
  //   ],
  //   otherProps: {
  //     nameKey: 'id',
  //     valueKey: 'name',
  //   },
  // },
  formDict: null,
  formInitialValueObj: null,
  hasTooltip: false,
  // creditorList: [],
  ifResetAfterSuccess: true,
  ifShowFormLoading: false,
  width: 500,
  rowsNumber: 1,
  rowSplitTitleDict: null,
};

export default Form.create()(QnFormModal);
