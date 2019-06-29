import { AxiosRequestConfig, AxiosPromise, Method } from "../types"
import dispatchRequest from "./dispatchRequest";

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }

  delete(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }
  head(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }
  options(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }
  post(url: string, data:any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'post', data, config)
  }
  put(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'put', data, config)
  }
  path(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'patch', data, config)
  }

  _requestWithoutData(url:string, method: Method, config?:AxiosRequestConfig):AxiosPromise {
    return this.request(Object.assign(config || {}, {
      url,
      method
    }))
  }

  _requestWithData(url:string, method: Method, data?:any, config?:AxiosRequestConfig):AxiosPromise {
    return this.request(Object.assign(config || {}, {
      url,
      method,
      data
    }))
  }
}
