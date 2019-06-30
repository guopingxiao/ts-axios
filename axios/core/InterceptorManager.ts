import { ResolvedFn, RejectedFn } from "../types"

interface Intercepter<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class IntercepterManager<T> {
  private intercepters: Array<Intercepter<T> | null>

  constructor() {
    this.intercepters = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.intercepters.push({
      resolved,
      rejected
    })

    return this.intercepters.length - 1
  }

  eject(id: number): void {
    if (this.intercepters[id]) {
      this.intercepters[id] = null
    }
  }

  forEach(fn: (intercepter: Intercepter<T>) => void): void {
    this.intercepters.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
   }
}
