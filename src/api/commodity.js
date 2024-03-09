import request from '@/utils/request'

export function getProductDisplay(product) {
  // console.log(car)
  return request({
    url: '/product/getProductDisplay',
    method: 'post',
    data: product
  })
}

export function updateProductDisplay(product) {
  return request({
    url: '/product/updateProductDisplay',
    method: 'post',
    data: product
  })
}

export function insertProductDisplay(product) {
  return request({
    url: '/product/insertProductDisplay',
    method: 'post',
    data: product
  })
}
