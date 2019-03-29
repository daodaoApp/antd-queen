# antd-queen [![NPM version](https://badge.fury.io/js/antd-queen.svg)](https://npmjs.org/package/antd-queen) [![Build Status](https://travis-ci.org/caozihao/antd-queen.svg?branch=master)](https://travis-ci.org/caozihao/antd-queen)


##  introduce

这个项目主要是对antd组件的二次封装，开发它的原因是因为业务中有许多后台管理系统页面，而布局和数据展示几乎千篇一律。通过使用封装后的组件+布局，能够极大提高开发效率，其特点有以下几个方面：

* 通过一张配置表 + 组件的方式，即可生成一套完整数据 + 交互的表单（参考QnTable）
* 封装原有的antd代码较多的插件，让使用更加简洁，方便
* 提高组件内数据流的兼容性和代码健壮性


## Installation

```sh
$ npm install --save antd-queen
```

## Usage

```js
import { QnListPage } from 'antd-queen';
const { QnListPage } = require('antd-queen') ;
```

## License

MIT © [Mo9 Front End]()
