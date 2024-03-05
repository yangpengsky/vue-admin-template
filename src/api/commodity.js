import request from '@/utils/request'

export function getProductDisplay(Product) {
  // console.log(car)
  return request({
    url: '/product/getProductDisplay',
    method: 'post',
    data: Product
  })
}
