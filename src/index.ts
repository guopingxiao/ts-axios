import Axios from './core/Axios'
import { AxiosRequestConfig, AxiosStatic } from '../index'
import { Cancel, CancelToken, isCancel } from './cancel/index'
import mergeConfig from './helpers/mergeConfig'
import { extend } from './helpers/utils'

const createInstance = (defaultConfig: AxiosRequestConfig) => {
  const context = new Axios(defaultConfig)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, Axios.prototype, context)
  extend(instance, context)
  return instance
}

interface AxiosExport extends AxiosStatic {
  Axios: typeof Axios
  CancelToken: typeof CancelToken
  Cancel: typeof Cancel
}

const axios: AxiosExport = createInstance(defaults)

axios.create = (instanceConfig: AxiosRequestConfig) => {
  return createInstance(mergeConfig(axios.defaults, instanceConfig))
}
axios.Axios = Axios
axios.CancelToken = CancelToken
axios.isCancel = isCancel
axios.Cancel = Cancel
axios.all = function all (promises) {
  return Promise.all(promises)
}

export default axios
