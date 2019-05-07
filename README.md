## react-elm

![](https://img.shields.io/badge/react-16.5.2-blue.svg)
![](https://img.shields.io/badge/react--redux-5.0.7-green.svg)![](https://img.shields.io/badge/react--router--dom-4.3.1-f1ddb4.svg)
![](https://img.shields.io/badge/axios-0.18.0-ff69b4.svg)
![](https://img.shields.io/badge/swiper-4.4.1-yellow.svg)
![](https://img.shields.io/badge/webpack-4.19.1-003366.svg)
![](https://img.shields.io/badge/license-MIT-orange.svg)
# 前言
之前学习vue的时候, 就学习过`bailicangdu`大神的`vue2-elm`项目.最近在学习完react基础,想找一个实战项目来练手深入了解react, 就打算用react重写vue2-elm,后端数据还是用vue2-elm,实在没有经历撸后端(感谢bailicangdu).</br>
该项目是饿了吗, 目前开发了登录、注册、购物车、商品展示、用户信息等,算一个比较完整的项目,这个项目比较复杂,这也是我选这个项目的原因
# 技术栈
react4 + react-redux + react-router + es6 + axios + sass + webpack
# 说明
> 觉得对你有帮助,请点右上角的`Star`支持一下</br>
> bailicangdu大神的项目地址[点这里](https://github.com/bailicangdu/vue2-elm)</br>
> 推荐一下我的另一个项目“用console.log看vue源码” [点这里](https://github.com/liuyangjike/vue-console)

# 项目运行
`node >= 6.0`
```
  git clone git@github.com:liuyangjike/react-elm.git
  cd react-elm
  npm install 或用 cnpm
  npm run start
```
# 演示
[demo](http://www.jikeliu.top)
> 请用Chrome调试的手机模式查看


# 截图
<img src="https://s1.ax1x.com/2018/11/06/iofdjU.png" width="325" height="620"/> &#160;&#160;<img src="https://s1.ax1x.com/2018/11/06/iof1BQ.png" width="325" height="620"/>
<img src="https://s1.ax1x.com/2018/11/06/iof0uF.png" width="325" height="620"/> &#160;&#160;<img src="https://s1.ax1x.com/2018/11/06/iooQTe.png" width="325" height="620"/>
<img src="https://s1.ax1x.com/2018/11/06/iofBB4.png" width="325" height="620"/> &#160;&#160;<img src="https://s1.ax1x.com/2018/11/06/io5MjK.gif" width="325" height="620"/>
<img src="https://s1.ax1x.com/2018/11/06/io50u8.gif" width="325" height="620"/> &#160;&#160;<img src="https://s1.ax1x.com/2018/11/06/io5djf.gif" width="325" height="620"/>

# 项目结构
```javascript
├── build          ----------------------网页配置
│   ├── favicon.ico  
│   └── manifest.json 
├── config            ------------------webpack配置
│   ├── env.js       
│   ├── jest          
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── paths.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── package-lock.json
├── package.json    --------------------项目package.json
├── public          --------------------出口
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts        ---------------------运行的脚本
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src           ----------------------源码目录
│   ├── api       ----------------------API目录
│   │   ├── api.js
│   │   └── server.js
│   ├── assets   -----------------------资源目录
│   │   └── iconfont -------------------iconfont目录
│   ├── components   -------------------公共组件
│   │   ├── alert_tip  -----------------提示组件
│   │   ├── footer   -------------------导航栏组件
│   │   ├── header  --------------------header组件
│   │   ├── loader  --------------------加载组件
│   │   └── shop_list ------------------商店列表组件
│   ├── config    ----------------------项目一些配置
│   │   ├── envconfig.js  --------------配置信息
│   │   └── rem.js  --------------------自适应
│   ├── index.js    --------------------入口
│   ├── pages       --------------------页面目录
│   │   ├── food    --------------------食物页面
│   │   ├── info   ---------------------个人信息页面
│   │   ├── login  ---------------------登录页面
│   │   ├── msite  ---------------------商店页面
│   │   ├── profile --------------------主页页面
│   │   ├── set_user -------------------用户信息设置页面
│   │   ├── shop   ---------------------商店详情页面
│   │   └── technology  ----------------技术栈页面
│   ├── router   -----------------------路由
│   │   └── index.js
│   ├── serviceWorker.js  --------------热加载
│   ├── store   ------------------------react-redux状态管理目录
│   │   ├── store.js
│   │   └── user
│   ├── style   ------------------------通用样式目录
│   │   ├── base.scss
│   │   ├── mixin.scss
│   │   └── swiper.min.css
│   └── utils  ------------------------公用方法
│       ├── asyncComponent.jsx  -------异步加载组件
│       └── commons.js  ---------------公用方法
├── README.md      ----------------------README
└── tree.md  --------------------------项目结构

```
