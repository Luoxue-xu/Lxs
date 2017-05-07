# Lxs

由webpack1.x 升级到webpack2.x的前端自动化构建配置

webpack2.x + es6 + react + scss

### 说明

config文件夹是webpack的配置文件
```
dev.js // 是开发环境的配置文件
prod.js // 是生产环境的配置文件
```

### 启动

```
npm start
```

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
npm build:dist
```

构建生产环境代码会自动打包，其中 react react-dom 会独立打包，独立引用，同时多个模块引用的公共模块也会独立打包.

暂时没有添加图片的处理，后续会添加，图片处理的 loader 和其他的类似，参考[file-loader](https://doc.webpack-china.org/loaders/file-loader/)

### 备注

欢迎提出建议和意见，若有不合理的地方，请及时指正，谢谢。
