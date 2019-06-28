import { isPlaintObject } from './util'

function normalizeHeaderProps(headers: any, propName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((prop:string) => {
    if ((prop !== propName) && (prop.toUpperCase() === propName.toUpperCase())) {
      headers[propName] = headers[prop]
      delete headers[prop]
    }
  })
}


export function processHeaders(headers: any, data: any): any{
  normalizeHeaderProps(headers, 'Content-Type')

  if (isPlaintObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string):any {
  let parsed = Object.create(null)
  if (!Headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    val = val.trim()
    if (!key) {
      return
    }
    parsed[key] = val
  })

  return parsed
}
