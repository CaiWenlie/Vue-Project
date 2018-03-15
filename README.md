
### 环境配置：
安装[nodejs](https://nodejs.org/download/)(最低版本v7.7.4)
<br>
<br>
建议使用[nvm](https://github.com/coreybutler/nvm-windows)管理node版本

### 安装项目依赖
```
$ npm install -g cnpm
$ cnpm install
```

### 启动项目
```
$ npm run dev
```

### 引入样式
独立样式，使用import引入
```
import '@/assets/sass/app.scss'
```
嵌入样式，在vue文件中添加style
```
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  text-align: center;
}
</style>
```

### 图片src
在路径前加上'~'
```
<img src="~@/assets/logo.png">
```

### js模块加载
AMD加载(推荐)
```
require(['jquery'], function($){
  // ...
});
```
CommonJs
```
var component = require("component");
```
ES6 module
```
import MyModule from './my-module.js';
```

### 将普通js插件转化成module
对于不支持模块加载的js文件，在其尾部加上es6 module export
```
export default ModuleName
```
在非es6引入时需加上`.default`
```
require(['ModuleName'], function(MyModule){
  MyModule = MyModule.default
});
```
```
var MyModule = require("ModuleName").default;
```

### 切换API并启动项目
首先在`/config`目录下新建一个`***.env.js`文件，例如
```
module.exports = {
  NODE_ENV: '"production"',
  API: '"***/api"'
}
```
命令
```
npm run dev -- --env=***
```

### 生成可部署的代码
```
// 生产环境
npm run build
// 测试环境
npm run build -- --env=test
// 开发环境
npm run build -- --env=dev
```

### 开发指引
[Vue 2.0](https://cn.vuejs.org/)
<br>
