# 这是一个webpack配置说明 in 2021 

## Run the example
```
$ npm install
$ npm start
```

## Introduce
这个demo是简单的webpack配置demo，您可以根据实际项目需求，按照下方的配置说明，个性化的配置您的项目。

您也可以关注我，后续会发布最新的依赖的脚手架项目

This demo is a simple webpack configuration demo, you can personalise your project according to your actual project requirements by following the configuration instructions below.

You can also follow me and I will be posting the latest scaffolding projects with dependencies

## webpack.config.js 配置说明 Configuration instructions

The following comments are in Chinese, you can use the software to translate them

```js
const path = require('path')

// module.exports = function (webpackEnv) {
    module.exports = {
    //定义生产环境和开发环境
    //开发环境development 和生产环境 production构建目标差异很大
    //开发环境：需要强大的，具有实时重新加载或热模块替换能力，source map 和 localhost server 调试能力
    //生产环境: 我们关注更小的bundle，更轻量的source map，更优化的资源，改善加载时间。
    //所以不同环境配置不同，有倾向性。
    // const isEnvDevelopment = webpackEnv === 'development';
    // const isEnvProduction = webpackEnv === 'production';
    // const publicPath = isEnvProduction ? '/ui/' : isEnvDevelopment && '/';
    
    // return{
        //entry表示入口，webpack构建第一步将从entry开始，输入类型可以抽象为字符串，数组和对象。从入口开始，递归搜寻及解析出所有入口依赖的模块。 entry是必填的，否则会报错、退出
        entry: './src/app.js', //可以有一个入口，也可以有多个入口，多个入口对应多个**chunk**，具体写法看中文文档。entry根据构建出来的依赖关系图，从而知道哪些部分将会输出为bundle。
        //什么是chunk？
        //webpack专用术语，用于管理webpack打包进程。chunk和输出的**bundle**一一对应，但是，有些是一对多的关系。
        //如果entry配置的是对象object，可能就会出现多个thunk，这时候thunk名称是对象健值对中健的名称
        //什么是bundle？
        //bundle是已经加载完毕，和被编译后的源代码最终版本。由多个模块产生，一个应用可以拆分为多个bundle。Bundle Splitting是webpack优化代码的一种方法。
        //总之，chunk和bundle都可以拆分，按需加载，减少代码量。
        output: {
            path: path.resolve(__dirname , 'dist'), //输出文件存放的路径
            //filename: isEnvDevelopment ? 'bundle.js' : '[name].js',//输出文件完整名称，即使指定了多个入口点（entry points），output配置项也只能设置一个。
            filename:'bundle.js',
            publicPath: publicPath,//发布到线上，所有资源的URL前缀
            pathInfo:true,//是否包含有用的文件路径信息到生成到代码里，为布尔类型。
            chunkFilename:'[name].js',//chunk文件名称
            sourceMapFilename:'[file].map',//生成到source map文件名称
            devtoolModuleFilenameTemplate: 'webpack:lll[resource-path ]', //浏览器开发者工具显示的源码模块名称
            },
            //配置模块
        module: {
            rules:[
                { //babel es6转es5 兼容 babel-loader 同步的
                //配置模块的读取和解析规则，通常用来配置Loader。对模块源码进行转换
                test: /\.(js|mjs|jsx|ts|tsx)$/,//正则匹配命中要使用loader的文件,通过test、 inc1ude、 exclude三个配置项来选中Loader要应用规则的文件。
                include:[
                    path.resolve(__dirname , 'src') //只会命中这里面的文件
                ],
                exclude: /node_modules/, //忽略这里面的文件
                use: [//使用哪些loader，有先后次序，从后向前执行
                    'style-loader', //直接使用loader名称 scss 文件的处理顺序为先 sass-loader，再 css-loader，再 style-loader
                    {
                        options: {
                        //向html-loader传一些参数
                        },
                        loader: require.resolve('eslint-loader'),
                        //常用loader 分别配置
                        //转换编译：script-loader, babel-loader,ts-loader,coffee-loader
                        //处理样式：style-loader,css-loader,less-loader,sass-loader,postcss-loader（postcss和scss关系类似babel和js）
                        //处理文件：raw--loader,url-loader,file-loader
                        //处理数据：csv-loader,xml-loader
                        //处理模板语言：html-loader,pug-loader,jade-loader,markdown-loader
                        //清理和测试：mocha-loader,eslint-loader
                        //react：babel-preset-react
                    },
                ],
                },  
            ],
            noParse:[ //提高webpack构建性能，忽略没采用模块化的文件递归处理
                //noParse文件不能包含模块化的语句import，require，defind，不然会导致构建文件无法在浏览器浏览
                /lspecial-library\.js$1 //用正则匹配
            ]
        },
        plugins:[
            //配置插件,扩展webpack功能，plugin配置项接收一个数组，数组每一项都是使用一个plugin实例，plugin的参数通过构造函数传入。使用plungin，需要在社区找到plugin本身提供的配置项
        ],
        resolve: { //配置寻找模块的规则
            modules: [ //寻找模块的根目录，为 array 类型，默认以 node_modules 为根目录
            'node_modules',
            path.resolve( dirname, 'app'),
            ],
            extensions: ['.js', '.json', '.jsx', '.css'], //模块的后缀名
            alias :{ //除了可以用对象，也可以用数组进行详细配置
            //将'module’映射成'new-module', 'module/path/file'映射成'new-module/path/file’
            //通过别名映射原来的路径为新路径
            'module':'new-module',
            },
            symlinks: true , // 是否跟随文件的软链接去搜寻模块的路径 
            descriptionFiles: ['package.json'],//模块的描述文件 
            mainFields : ['main'], //模块的描述文件里描述入口的文件的字段名 
            enforceExtension: false, //是否强制导入语句写明文件后缀,如果为true，导入模块必须带后缀
            },
        performance: { //输出文件性能检查配置
            hints: false, // 关闭性能检查
            maxAssetSize: 200000 , // 最大文件的大小(单位为 bytes)
        }, 
        devtool: 'source-map', //用于开发环境调试，生产环境可以不配置
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true, //实时刷新
            hot: true 
        },
        target: 'web', //浏览器，默认
        profile: true, // 是否捕捉 Webpack构建的性能信息，用于分析是什么原因导致构建性能不佳
        cache : false , // 是否启用缓存来提升构建速度  
    }
// }

//优化

//1.缩小文件搜索范围
//* loader 调整目录结构，include缩小命中范围
//* resolve 定义搜索绝对路径
//* alias 映射新路径
//* extensions: [’js’],尽可能减少后缀尝试搜索的可能性
//* noParse 忽略没用模块化的文件

//2.用dllPlugin
// 动态链接库 antd react charts

//3.HappyPack 分解任务，多线程解析和处理文件 loader最耗时 happypack/loader

//4.自动刷新 watch监听 不监听node_modules

//5.区分环境 开发和生产

//6.压缩代码 uglifyJs 压缩js；cssnano 压缩css

//7.cdn加速

//8.tree shaking 可以用来剔除js中用不上的死代码

//9.提取公共代码，组件 公共代码base.js 所有页面都依赖的基础组件库，entry配置，打包成单独的trunk

//10.分割代码按需加载 import() 返回一个promise，output配置分割出去的thunk名称，在路由或者点击按钮事件里面配置

//11.使用prepack改变源码运行逻辑 plugin 运行时优化

//12.scope hoisting 作用于提升，打包出来的代码更小，运行更快 是一个plugin

//13.输出分析 webpack analyse

//[over]
```