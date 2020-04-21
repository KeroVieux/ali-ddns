const fs = require('fs')
const moment = require('moment')
const Core = require('@alicloud/pop-core')
const shell = require("shelljs")

const client = new Core({
  accessKeyId: '',
  accessKeySecret: '',
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
})

const checkRecord = async () => {
  const ipRes = shell.exec('ubus call network.interface.wan status | jsonfilter -e \'@["ipv4-address"][0].address\'')
  const ip = ipRes.stdout.replace(/[\r\n]/g, '')

  const existIp = fs.readFileSync('', 'utf-8')
  const altered = ip !== existIp
  fs.writeFileSync('', moment().format('YYYY-MM-DD hh:mm:ss'))
  return altered ? ip : false
}
const resetRecord = async (Value) => {
  const wwwPrams = {
    RecordId: '',
    RR: 'www',
    Type: 'A',
    Value,
  }

  const allParams = {
    RecordId: '',
    RR: '@',
    Type: 'A',
    Value,
  }

  const requestOption = {
    method: 'POST'
  }

  const allRes = await client.request('UpdateDomainRecord', allParams, requestOption)
  const wwwRes = await client.request('UpdateDomainRecord', wwwPrams, requestOption)

  fs.writeFileSync('', allRes && wwwRes ? Value : 'error')
}


const setIp = async () => {
  const needUpdateIp = await checkRecord()
  if (needUpdateIp) {
    resetRecord(needUpdateIp)
  }
}
setIp()
