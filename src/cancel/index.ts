
const isCancel = (value: any) => {
  return !!(value && value.__CANCEL__)
}

const Cancel = {}
const CancelToken = {}

export { isCancel, Cancel, CancelToken }