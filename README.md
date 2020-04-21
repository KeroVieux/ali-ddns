# 阿里域名ddns工具
## 实现方法
1. 部署此代码到你的wrt-open路由器上
2. 定时执行（建议5分钟）
3. 判断当前ip与线上所解析的ip不吻合则请求api修改ip

## 文件内必填参数
1. `accessKeyId` 
2. `accessKeySecret`
3. `RecordId`
4. lastCheck路径
5. 当前ip路径

## set up
1. fill up the argument which is required
2. `yarn`
3. done

## how to run
`npm run start`
