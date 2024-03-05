import request from '@/utils/request'

export function fetchSeries() {
  return request({
    url: '/brand/brandTree',
    method: 'get'
  })
}

export function fetchBrand() {
  return request({
    url: '/brand/brandList',
    method: 'get'
  })
}

export function fetchStore(seriesId) {
  return request({
    url: '/init/storeOpt',
    method: 'get',
    params: { seriesId }
  })
}

export function fetchCustomer(idCard) {
  return request({
    url: '/init/getCustomer',
    method: 'get',
    params: { idCard }
  })
}

export function getCars(query) {
  return request({
    url: '/car/getList',
    method: 'post',
    data: query
  })
}
