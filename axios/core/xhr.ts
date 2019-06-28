import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
export default function xhr(config: AxiosRequestConfig):AxiosPromise {
  return new Promise(resolve => {
    const { url, method = 'get', data = null, headers, responseType } = config

    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType &&
        responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }


    Object.keys(headers).forEach((prop: string) => {
      if (data === null && prop.toLowerCase() === 'content-type') {
        delete headers[prop]
      }
    })
    request.send(data)
  })



}
