import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transfromRequest, transfromResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'


function dispatchRequest(config: AxiosRequestConfig):AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}


function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transfromHeaders(config)
  config.data = transfromRequestData(config)
 }

function transformUrl(config: AxiosRequestConfig) {
  let { url, params } = config
  return buildURL(url!, params)
}

function transfromHeaders(config: AxiosRequestConfig) {
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transfromRequestData(config: AxiosRequestConfig): any {
  return transfromRequest(config.data)
}

function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfromResponse(res.data)
  return res
}



export default dispatchRequest
