import { read, WorkBook } from 'xlsx'

// 加载excel文件
export function loadExcelFile (url: string, callback?: Function) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.responseType = 'arraybuffer'
  xhr.setRequestHeader("Content-Type", "text/xml;charset=utf-8")
  xhr.onload = function (e) {
    if (xhr.status == 200) {
      const data = new Uint8Array(xhr.response)
      const workbook: WorkBook = read(data, { type: 'array' })
      if (callback) callback(workbook)
    }
  };
  xhr.send()
}

export const toPx = (num: number) => {
  return num + 'px'
}

export const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))