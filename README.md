# 微信小程序介绍
基础语法可以查看[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

小程序算是一种hybrid渲染（一小部分使用的原生组件，其他的就是h5），我们常说的混合应用，即web和native渲染结合  
分为**渲染层**和**逻辑层**。两者之间不能直接通讯，需要通过native作为中间层通信。  
ios下逻辑层运行在JavaScriptCore中，渲染层在WKWebView  
安卓下逻辑层运行在x5JSCore，渲染层在X5浏览器  
小程序开发者工具逻辑层使用的NWJS，渲染层使用的Chrome WebView  

- 打开小程序的开放工具运行一个小程序的项目，在console输入document回车就可以看到逻辑层  
- 输入openVendor()回车，就可以打开小程序基础代码库的存放位置
  - 这里面有两个可执行文件wcc和wcsc
  - 就是编译器
  - 可以在命令行直接使用
    -  ``.\wcc.exe -help``查看可执行命令
    - ``.\wcc.exe -d index.wxml -o index.js``执行编译
    - 就可以得到一个编译之后的index.js
- 输入openInspect()回车，就可以一个影藏的调试窗口，
  - 点击Apps点击inspect又会打开一个调试窗口
  - 如果apps下没有去pages下找 
    - 点击之后就可以看到渲染层了（可以在console中输入document）
    - wx-view等等这样的元素标签其实就是h5
- mac和win大致是一样的
- 编译目录有demo

# 原生云开发（2.weapp）
一个简单的小demo体验下云开发，需要先去注册小程序账号，并且开通云开发功能

创建云函数的时候可能遇到``Error: 请在编辑器云函数根目录（cloudfunctionRoot）选择一个云环境``报错  
一般是没有选择当前环境造成的，cloudfunctions目录右键选择即可，或者是project.config.json里的cloudfunctionRoot配置不对  
再就是miniprogram文件夹下的app.js里的env记得配置id

也可以开启本地调试，一个云函数就是一个node项目，哪个需要调试就需要初始化项目``npm install``初始化之后就可以勾选了，有两种触发模式，一种是手动输入参数触发另一种是模拟器触发  
如果云端调用出现``wx-server-sdk``不存在云端安装不行就本地安装好了全部上传上去就行了  