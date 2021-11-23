import ctRequest from "../index";
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
export function loginAccountRequest(account) {
  return ctRequest.post({
    url: '/user/login',
    data: account
  })
}

export function getCodeRequest(payload) {
  return axios.post('api/user/get/check/code', payload)
}
export function loginPhoneRequest(account) {
  return ctRequest.post({
    url: '/user/login/by/phone',
    data: account
  })
}

export function registerAccountRequest(account) {
  return ctRequest.post({
    url: '/user/register',
    data: account
  })
}

export function updatePasswordRequest(account) {
  return ctRequest.post({
    url: '/user/update/by/password',
    data: account
  })
}

export function updatePhoneRequest(account) {
  return ctRequest.post({
    url: '/user/update/by/phone',
    data: account
  })
}

export function registerUserRequest(payload) {
  return ctRequest.post({
    url: '/user/register',
    data: payload
  })
}