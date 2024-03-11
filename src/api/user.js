import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getUserList(userProfile) {
  return request({
    url: '/user/getUserProfile',
    method: 'post',
    data: userProfile
  })
}

export function resetUserPasswordBath(list) {
  return request({
    url: '/user/resetUserPasswordBath',
    method: 'post',
    data: list
  })
}
