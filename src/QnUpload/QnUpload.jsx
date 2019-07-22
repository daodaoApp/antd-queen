/* eslint-disable lines-between-class-members */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Upload, Button, Icon } from 'antd';
// import './QnUpload.less';

class QnUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  render() {
    this.uploadProps = {
      name: 'file',
      // action: service.upload,
      data: {
        // userId,
        // token,
      },
      multiple: true,
      onChange: info => {
        let { fileList } = info;
        // console.log('fileList.length------->', fileList.length);
        fileList = fileList.slice(-10);
        // 给每个文件拼出下载链接
        fileList = fileList.map(() => {
          // if (fileItem.response && fileItem.response.code === 0) {
          //   const queryStr = data2urlStr(
          //     { userId, token, fileKey: fileItem.response.data },
          //     true,
          //     true,
          //   );
          //   fileItem.url = `${service.downloadByKey}${queryStr}`;
          //   fileItem.fileKey = fileItem.response.data;
          // }
          // return fileItem;
        });

        // this.setState({
        //   fileList,
        // });
      },
    };
    return (
      <Upload className="QnUpload" {...this.uploadProps}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    );
  }
}
QnUpload.propTypes = {};
QnUpload.defaultProps = {};
export default QnUpload;
