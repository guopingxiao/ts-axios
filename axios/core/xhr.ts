import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
export default function xhr(config: AxiosRequestConfig):AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType } = config

    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState === 0) {
        return
      }
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
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(
        `timeout ${config.timeout}ms exceeded`,
        config,
        `ECONNABORTED`,
        request
      ))
    }


    Object.keys(headers).forEach((prop: string) => {
      if (data === null && prop.toLowerCase() === 'content-type') {
        delete headers[prop]
      }
    })

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }
    request.send(data)
  })
}
