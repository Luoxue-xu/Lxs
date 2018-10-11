# Lxs

基于webpack4.x的前端自动化构建配置

webpack4.x + es6 + react + react-router-dom + scss

### 说明

```
webpack.config.js // 最初配置，忽略
webpack.dev.js // 是开发环境的配置文件
webpack.pro.js // 是生产环境的配置文件
```

### 启动

```
npm start
```


### 热替换还没加

启动之后支持热更新，无需刷新页面，便能替换、增加、删除必要的模块。

react 要支持模块热更新，需要在入口文件引入react-hot-loader模块，具体配置如下:
```
...
import { AppContainer } from 'react-hot-loader';
...

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.querySelector('#wrapper')
    );
}

render(Index); // 切记，不要忘记执行这一步，不然默认不会渲染组件哦

if (module.hot) {
  module.hot.accept('./js/Index', () => {
    render(Index); // 这里才是每次修改之后的更新
  });
}

```
如有疑问，可以参考[模块热替换 - React](https://doc.webpack-china.org/guides/hmr-react/)

### 构建生产环境代码

```
npm run build
```

构建生产环境代码会自动打包，其中 react react-dom 默认是引用第三方CDN服务，同时多个模块引用的公共模块也会独立打包.

### 关于 react-router-dom 的使用，参考下面的文档

[react-router-dom](https://reacttraining.cn/)

### 备注

欢迎提出建议和意见，若有不合理的地方，请及时指正，谢谢。
