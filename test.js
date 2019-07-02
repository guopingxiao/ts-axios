/** 定义一个promiseRequest */
let requestPromise = function () {
  let chain = [{
    resolved: () => { console.log('xhr'); return 'xhr'},
    rejected: () => 'rejected'
  }]

  let requestInters = ['request1', 'request2', 'request3']
  requestInters.forEach(request => {
    chain.unshift({
      resolved: () => { console.log(request); return request},
      rejected: () => `${err}${request}`
    })
  })

  let responseInters = ['response1', 'response2', 'response3']
  responseInters.forEach(response => {
    chain.push({
      resolved: () => { console.log(response); return response},
      rejected: () => `${err}${response}`
    })
  })

  let promise = Promise.resolve('config')

  while (chain.length) {
    let { resolved, rejected } = chain.shift()
    // 精华都是在这句

    promise = promise.then(resolved, rejected)
  }
  // return promise调用链
  // promise.then(resolved1, rejected1).then(resolved2, rejected2).then(resolved2, rejected3).then() ....
  return promise
}

requestPromise().then(res => {

  console.log(res)
  // request3
  // request2
  // request1
  // xhr
  // response1
  // response2
  // response3
  // response3
})


