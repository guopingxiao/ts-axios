const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val:any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlaintObject(val:any) {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(target:T, source:U): T & U {
  for (const key in source) {
    if (!(target as T&U)[key] && source[key] !== undefined) {
      (target as T&U)[key] = source[key] as any
    }
  }
  return target as T & U
}
