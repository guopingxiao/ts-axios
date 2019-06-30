import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from "../types"
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./InterceptorManager"

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
export default class Axios {
  intercepters: Interceptors

  constructor() {
    this.intercepters = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }


  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain:PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.intercepters.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.intercepters.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
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
