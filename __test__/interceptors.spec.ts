/* global getAjaxRequest */

import axios from '../src/index'
import sinon from 'sinon'

describe('interceptors', function () {
  let XHR:any
  let requests: any = []
  const API_URL = 'http://api.github.com/'
  beforeEach(() => {
    XHR = sinon.useFakeXMLHttpRequest() //创建一个模拟的XMLHttpRequest对象
    XHR.onCreate = function (req: any) {
      requests.push(req)
    }
  })

  afterEach( () => {
    XHR.restore()
  })

  it('should add a request interceptor', async () => {
    axios.interceptors.request.use(function (config) {
      config.headers.test = 'added by interceptor'
      return config
    })
    try {
      let res = await axios.get(API_URL)
      console.log(res)
    } catch (error) {
      console.log( error)
    }

    requests[0].respond(200, {"Content-Type": 'application/json'}, 'OK'); // 模拟返回值

    expect(requests.length).toBe(1)

    expect(requests[0].url.requestHeaders.test).toBe('added by interceptor')

    })
  })

  // it('should add a request interceptor that returns a new config object', function (done) {
  //   axios.interceptors.request.use(function (config) {
  //     return {
  //       url: '/bar',
  //       method: 'post'
  //     }
  //   })

  //   const failTest = (e) => done.fail(e.message)

  //   axios.get('/foo').catch(failTest)

  //   getAjaxRequest().then(function (request) {
  //     expect(request.method).toBe('POST')
  //     expect(request.url).toBe('/bar')
  //     done()
  //   }).catch(failTest)
  // })

  // it('should add a request interceptor that returns a promise', function (done) {
  //   axios.interceptors.request.use(function (config) {
  //     return new Promise(function (resolve) {
  //       // do something async
  //       setTimeout(function () {
  //         config.headers.async = 'promise'
  //         resolve(config)
  //       }, 100)
  //     })
  //   })

  //   axios.get('/foo')

  //   getAjaxRequest().then(function (request) {
  //     expect(request.requestHeaders.async).toBe('promise')
  //     done()
  //   })
  // })

  // it('should add multiple request interceptors', function (done) {
  //   axios.interceptors.request.use(function (config) {
  //     config.headers.test1 = '1'
  //     return config
  //   })
  //   axios.interceptors.request.use(function (config) {
  //     config.headers.test2 = '2'
  //     return config
  //   })
  //   axios.interceptors.request.use(function (config) {
  //     config.headers.test3 = '3'
  //     return config
  //   })

  //   axios.get('/foo')

  //   getAjaxRequest().then(function (request) {
  //     expect(request.requestHeaders.test1).toBe('1')
  //     expect(request.requestHeaders.test2).toBe('2')
  //     expect(request.requestHeaders.test3).toBe('3')
  //     done()
  //   })
  // })

  // it('should add a response interceptor', function (done) {
  //   let response

  //   axios.interceptors.response.use(function (data) {
  //     data.data = data.data + ' - modified by interceptor'
  //     return data
  //   })

  //   axios.get('/foo').then(function (data) {
  //     response = data
  //   })

  //   getAjaxRequest().then(function (request) {
  //     request.respondWith({
  //       status: 200,
  //       responseText: 'OK'
  //     })

  //     setTimeout(function () {
  //       expect(response.data).toBe('OK - modified by interceptor')
  //       done()
  //     }, 100)
  //   })
  // })

  // it('should add a response interceptor that returns a new data object', function (done) {
  //   let response

  //   axios.interceptors.response.use(function () {
  //     return {
  //       data: 'stuff'
  //     }
  //   })

  //   axios.get('/foo').then(function (data) {
  //     response = data
  //   })

  //   getAjaxRequest().then(function (request) {
  //     request.respondWith({
  //       status: 200,
  //       responseText: 'OK'
  //     })

  //     setTimeout(function () {
  //       expect(response.data).toBe('stuff')
  //       done()
  //     }, 100)
  //   })
  // })

  // it('should add a response interceptor that returns a promise', function (done) {
  //   let response

  //   axios.interceptors.response.use(function (data) {
  //     return new Promise(function (resolve) {
  //       // do something async
  //       setTimeout(function () {
  //         data.data = 'you have been promised!'
  //         resolve(data)
  //       }, 10)
  //     })
  //   })

  //   axios.get('/foo').then(function (data) {
  //     response = data
  //   })

  //   getAjaxRequest().then(function (request) {
  //     request.respondWith({
  //       status: 200,
  //       responseText: 'OK'
  //     })

  //     setTimeout(function () {
  //       expect(response.data).toBe('you have been promised!')
  //       done()
  //     }, 100)
  //   })
  // })

  // it('should add multiple response interceptors', function (done) {
  //   let response

  //   axios.interceptors.response.use(function (data) {
  //     data.data = data.data + '1'
  //     return data
  //   })
  //   axios.interceptors.response.use(function (data) {
  //     data.data = data.data + '2'
  //     return data
  //   })
  //   axios.interceptors.response.use(function (data) {
  //     data.data = data.data + '3'
  //     return data
  //   })

  //   axios.get('/foo').then(function (data) {
  //     response = data
  //   })

  //   getAjaxRequest().then(function (request) {
  //     request.respondWith({
  //       status: 200,
  //       responseText: 'OK'
  //     })

  //     setTimeout(function () {
  //       expect(response.data).toBe('OK123')
  //       done()
  //     }, 100)
  //   })
  // })

  // it('should allow removing interceptors', function (done) {
  //   let response

  //   axios.interceptors.response.use(function (data) {
  //     data.data = data.data + '1'
  //     return data
  //   })
  //   const intercept = axios.interceptors.response.use(function (data) {
  //     data.data = data.data + '2'
  //     return data
  //   })
  //   axios.interceptors.response.use(function (data) {
  //     data.data = data.data + '3'
  //     return data
  //   })

  //   axios.interceptors.response.eject(intercept)

  //   axios.get('/foo').then(function (data) {
  //     response = data
  //   })

  //   getAjaxRequest().then(function (request) {
  //     request.respondWith({
  //       status: 200,
  //       responseText: 'OK'
  //     })

  //     setTimeout(function () {
  //       expect(response.data).toBe('OK13')
  //       done()
  //     }, 100)
  //   })
  // })

  // it('should execute interceptors before transformers', function (done) {
  //   axios.interceptors.request.use(function (config) {
  //     config.data.baz = 'qux'
  //     return config
  //   })

  //   axios.post('/foo', {
  //     foo: 'bar'
  //   })

  //   getAjaxRequest().then(function (request) {
  //     expect(request.params).toEqual('{"foo":"bar","baz":"qux"}')
  //     done()
  //   })
  // })

  // it('should modify base URL in request interceptor', function (done) {
  //   const instance = axios.create({
  //     baseURL: 'http://test.com/'
  //   })

  //   instance.interceptors.request.use(function (config) {
  //     config.baseURL = 'http://rebase.com/'
  //     return config
  //   })

  //   instance.get('/foo')

  //   getAjaxRequest().then(function (request) {
  //     expect(request.url).toBe('http://rebase.com/foo')
  //     done()
  //   })
  // })
// })
