// import React, { Component } from 'react';
// import propTypes from 'prop-types';
// import { Tabs, Button, Card } from 'antd';
// import './QnListPage.less';
// import { Link } from 'dva/router';
// import QnTable from '../QnTable/QnTable';
// import QnFilter from '../QnFilter/QnFilter';
// import QnFormModal from '../QnFormModal/QnFormModal';
// import QnTableWithSummary from '../QnTableWithSummary/QnTableWithSummary';


// const TabPane = Tabs.TabPane;

// class QnListPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     console.log('2222')
//   }

//   // componentWillReceiveProps(nextProps) { }

//   // genAdder = () => {
//   //   if (!this.props.hasAdder) {
//   //     return false;
//   //   }
//   //   if (this.props.adderType === 'link') {
//   //     return (
//   //       <Link to={this.props.adderRoute}>
//   //         <Button
//   //           className="adderBtn"
//   //           icon="plus"
//   //           type="primary"
//   //         >
//   //           {`新增${this.props.title}`}
//   //         </Button>
//   //       </Link>
//   //     );
//   //   } else if (this.props.adderType === 'modal') {
//   //     return (
//   //       <QnFormModal
//   //         title={`新增${this.props.title}`}
//   //         buttonProps={{
//   //           type: 'primary',
//   //           icon: 'plus',
//   //           title: `新增${this.props.title}`,
//   //           className: 'listPageBtn',
//   //           style: { marginBottom: '0.5rem' },
//   //         }}
//   //         formItems={this.props.formItems}
//   //         formDict={this.props.formDict}
//   //         formInitValueObj={this.props.formInitValueObj}
//   //         handleOk={this.props.handleAdd}
//   //       />
//   //     );
//   //   }
//   // }

//   render() {
//     <div>
//       QnListPage
//     </div>
//   }
//   //   const {
//   //     loading, columns, dataSource, total, handlePageChange, handlePageSizeChange, rowKey, defaultColumnValues, bordered,
//   //     expandedRowRender, expandRowByClick, current, hasRowSelection, handleRowSelect, middleContent,
//   //     hasPagination, pageSize, selectedRowKeys, otherQnFilterProps, scroll,
//   //   } = this.props;

//   //   const tabContent = (
//   //     <div className="QnListPage">
//   //       {this.genAdder()}
//   //       {
//   //         this.props.hasFilter
//   //           ? (
//   //             <QnFilter
//   //               rules={this.props.filterRules}
//   //               handleChange={this.props.handleFilterChange}
//   //               {...otherQnFilterProps}
//   //             />
//   //           )
//   //           : null
//   //       }
//   //       {/* <br /> */}
//   //       {middleContent ? middleContent() : ''}
//   //       {
//   //         this.props.hasSummary
//   //           ? (
//   //             <QnTableWithSummary
//   //               loading={loading}
//   //               columns={columns}
//   //               dataSource={dataSource}
//   //               total={total}
//   //               handlePageChange={handlePageChange}
//   //               handlePageSizeChange={handlePageSizeChange || handlePageChange}
//   //               rowKey={rowKey}
//   //               defaultColumnValues={defaultColumnValues}
//   //               otherProps={this.props.otherTableProps}
//   //               scroll={scroll}
//   //               {...this.props.otherQnTableProps}

//   //               //-------------------
//   //               summaryColumnValues={this.props.summaryColumnValues}
//   //             />
//   //           )
//   //           : (<div style={{ backgroundColor: '#fff' }}>
//   //             <QnTable
//   //               current={current}
//   //               loading={loading}
//   //               columns={columns}
//   //               dataSource={dataSource}
//   //               total={total}
//   //               bordered={bordered}
//   //               expandedRowRender={expandedRowRender}
//   //               expandRowByClick={expandRowByClick}
//   //               handlePageChange={handlePageChange}
//   //               handlePageSizeChange={handlePageSizeChange || handlePageChange}
//   //               rowKey={rowKey}
//   //               hasPagination={hasPagination}
//   //               defaultColumnValues={defaultColumnValues}
//   //               defaultPageSize={this.props.defaultPageSize}
//   //               hasRowSelection={hasRowSelection}
//   //               handleRowSelect={handleRowSelect}
//   //               pageSize={pageSize}
//   //               scroll={scroll}
//   //               selectedRowKeys={selectedRowKeys}
//   //               otherProps={this.props.otherTableProps}
//   //               {...this.props.otherQnTableProps}
//   //             />
//   //           </div>

//   //           )
//   //       }

//   //     </div>
//   //   );
//   //   let result;
//   //   if (this.props.hasTab) {
//   //     result = (
//   //       <Tabs>
//   //         <TabPane
//   //           tab={this.props.title}
//   //           key="main"
//   //         >
//   //           {tabContent}
//   //         </TabPane>
//   //       </Tabs>
//   //     );
//   //   } else {
//   //     result = tabContent;
//   //   }
//   //   return result;
//   // }
// }
// QnListPage.propTypes = {};
// QnListPage.defaultProps = {
//   // 通用
//   loading: false,
//   title: 'foo',
//   hasTab: true,

//   // 表格相关
//   columns: [],
//   dataSource: [],
//   total: -1,
//   rowKey: item => item.id,
//   handlePageChange: () => { },
//   defaultPageSize: 10,
//   bordered: false,
//   // defaultColumnValues: [],

//   // 表格汇总列相关
//   hasSummary: false,
//   summaryColumnValues: [],

//   // 表格过滤器相关
//   hasFilter: true,
//   filterRules: [
//     {
//       tag: 'Input',
//       name: 'userMobile',
//       title: '用户手机号',
//       // initValue: undefined,
//     }, {
//       tag: 'InputNumber',
//       name: 'orderCode',
//       title: '订单编号',
//       initValue: undefined,
//     },
//   ],
//   handleFilterChange: () => { },

//   // 其他表格参数
//   otherTableProps: {},
//   otherQnTableProps: {},

//   // 新增记录相关
//   hasAdder: true,
//   // adderType :modal | link 默认为modal
//   adderType: 'modal',
//   // 如果是modal, 需要以下参数
//   formItems: [],
//   formDict: null,
//   formInitValueObj: null,
//   handleAdd: null,
//   // 如果是link, 需要以下参数
//   adderRoute: '',


// };
// export default QnListPage;

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Tabs, Button, Card } from 'antd';
import './QnListPage.less';
import { Link } from 'dva/router';
import QnTable from '../QnTable/QnTable';
import QnFilter from '../QnFilter/QnFilter';
import QnFormModal from '../QnFormModal/QnFormModal';
import QnTableWithSummary from '../QnTableWithSummary/QnTableWithSummary';


const TabPane = Tabs.TabPane;

class QnListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('QnListPage');
  }

  // componentWillReceiveProps(nextProps) { }

  genAdder = () => {
    if (!this.props.hasAdder) {
      return false;
    }
    if (this.props.adderType === 'link') {
      return (
        <Link to={this.props.adderRoute}>
          <Button
            className="adderBtn"
            icon="plus"
            type="primary"
          >
            {`新增${this.props.title}`}
          </Button>
        </Link>
      );
    } else if (this.props.adderType === 'modal') {
      return (
        <QnFormModal
          title={`新增${this.props.title}`}
          buttonProps={{
            type: 'primary',
            icon: 'plus',
            title: `新增${this.props.title}`,
            className: 'listPageBtn',
            style: { marginBottom: '0.5rem' },
          }}
          formItems={this.props.formItems}
          formDict={this.props.formDict}
          formInitValueObj={this.props.formInitValueObj}
          handleOk={this.props.handleAdd}
        />
      );
    }
  }

  render() {
    const {
      loading, columns, dataSource, total, handlePageChange, handlePageSizeChange, rowKey, defaultColumnValues, bordered,
      expandedRowRender, expandRowByClick, current, hasRowSelection, handleRowSelect, middleContent,
      hasPagination, pageSize, selectedRowKeys, otherQnFilterProps, scroll,
    } = this.props;

    const tabContent = (
      <div className="QnListPage">
        {this.genAdder()}
        {
          this.props.hasFilter
            ? (
              <QnFilter
                rules={this.props.filterRules}
                handleChange={this.props.handleFilterChange}
                {...otherQnFilterProps}
              />
            )
            : null
        }
        {/* <br /> */}
        {middleContent ? middleContent() : ''}
        {
          this.props.hasSummary
            ? (
              <QnTableWithSummary
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                total={total}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange || handlePageChange}
                rowKey={rowKey}
                defaultColumnValues={defaultColumnValues}
                otherProps={this.props.otherTableProps}
                scroll={scroll}
                {...this.props.otherQnTableProps}

                //-------------------
                summaryColumnValues={this.props.summaryColumnValues}
              />
            )
            : (<div style={{ backgroundColor: '#fff' }}>
              <QnTable
                current={current}
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                total={total}
                bordered={bordered}
                expandedRowRender={expandedRowRender}
                expandRowByClick={expandRowByClick}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange || handlePageChange}
                rowKey={rowKey}
                hasPagination={hasPagination}
                defaultColumnValues={defaultColumnValues}
                defaultPageSize={this.props.defaultPageSize}
                hasRowSelection={hasRowSelection}
                handleRowSelect={handleRowSelect}
                pageSize={pageSize}
                scroll={scroll}
                selectedRowKeys={selectedRowKeys}
                otherProps={this.props.otherTableProps}
                {...this.props.otherQnTableProps}
              />
            </div>

            )
        }

      </div>
    );
    let result;
    if (this.props.hasTab) {
      result = (
        <Tabs>
          <TabPane
            tab={this.props.title}
            key="main"
          >
            {tabContent}
          </TabPane>
        </Tabs>
      );
    } else {
      result = tabContent;
    }
    return result;
  }
}
QnListPage.propTypes = {};
QnListPage.defaultProps = {
  // 通用
  loading: false,
  title: 'foo',
  hasTab: true,

  // 表格相关
  columns: [],
  dataSource: [],
  total: -1,
  rowKey: item => item.id,
  handlePageChange: () => { },
  defaultPageSize: 10,
  bordered: false,
  // defaultColumnValues: [],

  // 表格汇总列相关
  hasSummary: false,
  summaryColumnValues: [],

  // 表格过滤器相关
  hasFilter: true,
  filterRules: [
    {
      tag: 'Input',
      name: 'userMobile',
      title: '用户手机号',
      // initValue: undefined,
    }, {
      tag: 'InputNumber',
      name: 'orderCode',
      title: '订单编号',
      initValue: undefined,
    },
  ],
  handleFilterChange: () => { },

  // 其他表格参数
  otherTableProps: {},
  otherQnTableProps: {},

  // 新增记录相关
  hasAdder: true,
  // adderType :modal | link 默认为modal
  adderType: 'modal',
  // 如果是modal, 需要以下参数
  formItems: [],
  formDict: null,
  formInitValueObj: null,
  handleAdd: null,
  // 如果是link, 需要以下参数
  adderRoute: '',


};
export default QnListPage;

