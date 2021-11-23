import ctRequest from '../index'
import axios from 'axios'
import LocalCache from "@/utils/LocalCache.js"

axios.interceptors.request.use(function (config) {
  const token = LocalCache.getCache('token')
  if (token) {
    config.headers.token = token
    return config
  }
}, function (error) {
  return Promise.reject(error)
})
export function getRoleMenuRequest() {
  return ctRequest.get({
    url: '/user/get/menu'
  })
}

export function getHotelInfoRequest(id) {
  return axios.post('api/get/room/information', id)
}

export function getHotelTypeRequest() {
  return ctRequest.get({
    url: '/get/room/type'
  })
}

export function updateRoomInfoRequest(payload) {
  console.log(111)
  return ctRequest.post({
    url: '/update/room/information',
    data: payload
  })
}

export function insertRoomInfoRequest(payload) {
  return ctRequest.post({
    url: '/insert/room/information',
    data: payload
  })
} 

export function deleteRoomInfoRequest(payload) {
  return axios.post('api/delete/room/information',payload)
}

export function getControllInfoRequest(id) {
  const menuId = { id: id }
  return axios.post('/api/get/hotel/information', menuId)
}

export function getUserInfoRequest() {
  return ctRequest.get({
    url: '/get/login/user/details'
  })
}
export function updateHotelInfoRequest(payload) {
  return ctRequest.post({
    url: '/update/hotel/information',
    data: payload
  })
}

export function getRoomOrderRequest(payload) {
  return ctRequest.get({
    url: '/get/assigned/status/room/order',
    params: payload
  })
}

export function getRoomOrderLogRequest(payload) {
  return ctRequest.get({
    url: '/get/all/room/order/log/by/page',
    params: payload
  })
}

export function generateRoomOrderRequest(payload) {
  return axios.post('api/user/receive/room/order', payload)
}

export function deleteRoomOrderRequest(payload) {
  return axios.post('api/user/check/out/room/order', payload)
}

export function getPayRoomOrderRequest(payload) {
  return ctRequest.get({
    url: '/get/not/pay/room/order',
    params: payload
  })
}

export function getReturnDepositRequest(payload) {
  return ctRequest.get({
    url: '/get/not/return/deposit',
    params: payload
  })
}

export function distributeRoomRequest(payload) {
  return axios.post('api/distribute/room/for/order', payload)
}

export function deleteRoomOrderLogRequest(payload) {
  return axios.post('api/delete/room/order', payload)
}

export function createUserDepositRequest(payload) {
  return axios.post('api/user/create/Deposit', payload)
}

export function returnDepositRequest(payload) {
  return axios.post('api/user/return/deposit', payload)
}

export function getUserListRequest(payload) {
  return ctRequest.get({
    url: '/auth/manage/get/user/list',
    params: payload
  })
}

export function getPermissionTreeRequest() {
  return ctRequest.get({url: '/auth/manage/get/permission/tree'})
}

export function getAllRoleRequest() {
  return ctRequest.get({
    url: '/get/all/role'
  })
}
export function updateUserRoleRequest(payload) {
  return axios.post('api/auth/manage/update/user/role', payload)
}

export function addUserRoleRequest(payload) {
  return axios.post('api/auth/manage/add/role', payload)
}

export function getReceiveButtonRequest(payload) {
  return ctRequest.get({
    url: '/user/get/receive/button/list',
    params: payload
  })
}

export function updateRoleRequest(payload) {
  return axios.post('api/auth/manage/update/auth/of/role', payload)
}

export function deleteRoleRequest(payload) {
  return axios.post('api//auth/manage/delete/role', payload)
}

export function deleteUserRequest(payload) {
  return axios.post('api//auth/manage/delete/user', payload)
}

export function getGenderDataRequest() {
  return ctRequest.get({
    url: '/user/get/data/of/gender/number'
  })
}

export function getOrderDataRequest() {
  return ctRequest.get({
    url: '/user/get/data/of/order/number'
  })
}
