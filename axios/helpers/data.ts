import { isPlaintObject } from './util'

export function transfromRequest(data: any): any {
  if (isPlaintObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transfromResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {

    }
  }
  return data
}

