import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Dispatch, ConnectProps, ConnectState } from '@/models/connect';
// import {} from 'antd';
import withRouter from 'umi/withRouter';
//import styles from './Detail.less';

interface IConnectState extends ConnectState {
  login: {
    [profile: string]: object;
  };
}

interface IProps extends ConnectProps {
  dispatch: Dispatch;
}

interface IState {}

@connect(({ login }: IConnectState) => ({
  profile: login.profile,
}))
class Detail extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  // handleClick = (e: Object): void => {};

  render() {
    return <div /* className={styles.Detail} */>详情</div>;
  }
}

export default withRouter(Detail as any);
