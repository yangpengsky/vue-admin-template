import request from '@/utils/request'

export function addBrand(brand) {
  return request({
    url: '/brand/addBrand',
    method: 'get',
    params: { brand }
  })
}

export function delBrand(brandId) {
  return request({
    url: '/brand/delBrand',
    method: 'get',
    params: { brandId }
  })
}

export function addSeries(brandId, seriesName) {
  return request({
    url: '/series/addSeries',
    method: 'get',
    params: { brandId, seriesName }
  })
}

export function delSeries(seriesId) {
  return request({
    url: '/series/delSeries',
    method: 'get',
    params: { seriesId }
  })
}

export function addStore(car) {
  // console.log(car)
  return request({
    url: '/car/addCar',
    method: 'post',
    params: car
  })
}

export function getSeriesByBrandId(brandId) {
  return request({
    url: '/series/getSeriesByBrandId',
    method: 'get',
    params: { brandId }
  })
}

export function fetchList(query) {
  // console.log(query)
  return request({
    url: '/store/getList',
    method: 'get',
    params: query
  })
}

export function updateStore(car) {
  console.log(car)
  return request({
    url: '/car/update',
    method: 'post',
    params: car
  })
}
