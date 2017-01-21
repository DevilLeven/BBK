# framwork

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

```
## 新增element 默认主题编译,可修改该框架的默认主题
默认主题配置文件src/css/theme-default.scss
``` bash
node_modules/.bin/et -c src/css/theme-default.css -o src/css/theme//从新编译主题
```

增加默认主题修改，Vue文件中css部分外部加载，提高代码可读性，回避less在webstrom中报错

##页面地址
>求职端

```
#主页
/home
#职位列表
/jobs
#职位详情
/jobinfo
#用户页面
/user/resume
#投递反馈
/user/SendRecord
```
>企业端

```
#企业信息初始化
/companyinfoinit
#企业信息
/companyinfo
#招聘管理
/resumelist
#职位管理
/positionlist

```
>DB端

```
#个人信息初始化
/DBuserInfoinit
#个人中心
/DBuserinfo
#学员管理
/positionlist
```
