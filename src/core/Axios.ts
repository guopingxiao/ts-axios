import {AxiosRequestConfig } from '../../index'


/**
 * 默认导出Axios类
 */
export default class Axios { 
  defaults: AxiosRequestConfig
  interceptors: {
    request: {};
    response: {};
  }
  constructor (instanceConfig: AxiosRequestConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: {},
      response: {}
    }
  }

  request(config: AxiosRequestConfig = {}) { 

  }
    
}