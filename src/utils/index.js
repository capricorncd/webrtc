/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-08-12 23:06
 */
function isSupportMediaDevices() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
}

export {
  isSupportMediaDevices
}
