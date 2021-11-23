import {
  getHotelInfoRequest,
  getHotelTypeRequest,
  updateRoomInfoRequest,
  insertRoomInfoRequest,
  deleteRoomInfoRequest,
  getControllInfoRequest,
  getUserInfoRequest,
  updateHotelInfoRequest,
  getRoomOrderRequest,
  getRoomOrderLogRequest,
  generateRoomOrderRequest,
  deleteRoomOrderRequest,
  getPayRoomOrderRequest,
  getReturnDepositRequest,
  distributeRoomRequest,
  deleteRoomOrderLogRequest,
  createUserDepositRequest,
  returnDepositRequest,
  getUserListRequest,
  getPermissionTreeRequest,
  getAllRoleRequest,
  updateUserRoleRequest,
  getReceiveButtonRequest,
  addUserRoleRequest,
  updateRoleRequest,
  deleteRoleRequest,
  deleteUserRequest,
  getGenderDataRequest,
  getOrderDataRequest
} from '@/service/main/main.js'

const main = {
  namespaced: true,
  state() {
    return {
      hotelInfo: [],
      hotelType: [],
      controllInfo: {},
      userInfo: {},
      hotelPermission: [],
      roomOrder: {},
      roomOrderInfo: [],
      roomOrderPermission: [],
      roomOrderLog: {},
      roomOrderLogInfo: [],
      roomOrderLogPermission: [],
      returnDeposit: {},
      returnDepositInfo: [],
      returnDepositPermission: [],
      payRoomOrderPermission: [],
      userList: {},
      userListInfo: [],
      userListPermission: [],
      allRoleInfo: [],
      allRolePermission: [],
      permissionTree: [],
      genderData: {},
      orderData: []
    }
  },
  mutations: {
    changeHotelInfo(state, payload) {
      state.hotelInfo = payload
    },
    changeControllInfo(state, payload) {
      state.controllInfo = payload
    },
    changeHotelPermission(state, payload) {
      state.hotelPermission = payload
    },
    changeHotelType(state, payload) {
      state.hotelType = payload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeRoomOrder(state, payload) {
      state.roomOrder = payload
      state.roomOrderInfo = payload.list
    },
    changeRoomOrderPermission(state, payload) {
      state.roomOrderPermission = payload
    },
    changeRoomOrderLog(state, payload) {
      state.roomOrderLog = payload
      state.roomOrderLogInfo = payload.list
    },
    changeRoomOrderLogPermission(state, payload) {
      state.roomOrderLogPermission = payload
    },
    changePayRoomOrder(state, payload) {
      state.payRoomOrder = payload
      state.payRoomOrderInfo = payload.list
    },
    changePayRoomOrderPermission(state, payload) {
      state.payRoomOrderPermission = payload
    },
    changeReturnDeposit(state, payload) {
      const returnDepositList = []
      for (let i = 0; i < payload.list.length; i++) {
        returnDepositList.push({})
      }
      for (const i in payload.list) {
        Object.keys(payload.list[i]).forEach((key) => {
          if (typeof payload.list[i][key] === 'object') {
            for(const index in payload.list[i][key]) {
              if (typeof returnDepositList[i] === 'object') {
                returnDepositList[i][index] = payload.list[i][key][index]
              }
            }
          } else {
            if (typeof returnDepositList[i] === 'object') {
              returnDepositList[i][key] = payload.list[i][key]
            }
          }
        })
      }
      state.returnDepositInfo = returnDepositList
      state.returnDeposit = payload
    },
    changeReturnDepositPermission(state, payload) {
      state.returnDepositPermission = payload
    },
    changeUserList(state, payload) {
      state.userList = payload
      state.userListInfo = payload.list
    },
    changeUserListPermission(state, payload) {
      state.userListPermission = payload
    },
    changeAllRole(state, payload) {
      state.allRoleInfo = payload
    },
    changeAllRolePermission(state, payload) {
      state.allRolePermission = payload
    },
    changePermissionTree(state, payload) {
      state.permissionTree = payload
    },
    changeGenderData(state, payload) {
      state.genderData = payload
    },
    changeOrderData(state, payload) {
      state.orderData = payload
    }
  },
  actions: {
    async getHotelInfoAction({ commit }, payload) {
      const HotelRestult = await getHotelInfoRequest(payload)
      const hotelInfo = HotelRestult.data.data
      const hotelPermission = HotelRestult.data.buttonList
      commit('changeHotelInfo', hotelInfo)
      commit('changeHotelPermission', hotelPermission)
    },
    async updateRoomInfoAction({ dispatch }, payload) {
      const id = { id: payload.pageId}
      delete payload.pageId
      await updateRoomInfoRequest(payload)
      dispatch('getHotelInfoAction', id)
    },
    async insertRoomInfoAction({ dispatch }, payload) {
      const id = { id: payload.pageId }
      delete payload.pageId
      await insertRoomInfoRequest({ ...payload, status: 0})
      dispatch('getHotelInfoAction', id)
    },
    async deleteRoomInfoAction({ dispatch }, payload) {
      const id = { id: payload.id }
      delete payload.id
      await deleteRoomInfoRequest(payload)
      dispatch('getHotelInfoAction', id)
    },
    async getHotelTypeAction({ commit }) {
      const typeRestult = await getHotelTypeRequest()
      const hotelType = typeRestult.data
      commit('changeHotelType', hotelType)
    },
    async getControllInfoAction({ commit }, payload) {
      const controllResult = await getControllInfoRequest(payload)
      const controllInfo = controllResult.data.data
      commit('changeControllInfo', controllInfo)
    },
    async getUserInfoAction({ commit }) {
      const userInfoResult = await getUserInfoRequest()
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
    },
    async updateHotelInfoAction(_, payload) {
      await updateHotelInfoRequest(payload)
    },
    async getRoomOrderAction({ commit }, payload) {
      const orderResult = await getRoomOrderRequest(payload)
      commit('changeRoomOrderPermission', orderResult.buttonList)
      const roomOrder = orderResult.data
      commit('changeRoomOrder', roomOrder)
    },
    async getRoomOrderLogAction({ commit }, payload) {
      const orderResult = await getRoomOrderLogRequest(payload)
      commit('changeRoomOrderLogPermission', orderResult.buttonList)
      const RoomOrderLog = orderResult.data
      commit('changeRoomOrderLog', RoomOrderLog)
    },
    async generateRoomOrderAction(_, payload) {
      await generateRoomOrderRequest(payload)
    },
    async deleteRoomOrderAction({ dispatch }, payload) {
      const id = { id: payload.pageId }
      delete payload.pageId
      await deleteRoomOrderRequest(payload)
      dispatch('getHotelInfoAction', id)
    },
    async getPayRoomOrderAction({ commit }, payload) {
      const payRoomOrderResult = await getPayRoomOrderRequest(payload)
      commit('changePayRoomOrderPermission', payRoomOrderResult.buttonList)
      commit('changePayRoomOrder', payRoomOrderResult.data)
    },
    async getReturnDepositAction({ commit }, payload) {
      const returnDepositResult = await getReturnDepositRequest(payload)
      commit('changeReturnDeposit', returnDepositResult.data)
      commit('changeReturnDepositPermission', returnDepositResult.buttonList)
    },
    async distributeRoomAction({ dispatch }, payload) {
      const id = { id: payload.pageId }
      delete payload.pageId
      await distributeRoomRequest(payload)
      dispatch('getRoomOrderAction', { ...id, status: '0'})
    },
    async deleteRoomOrderLogAction({ dispatch }, payload) {
      const id = { id: payload.id }
      delete payload.id
      await deleteRoomOrderLogRequest(payload)
      dispatch('getRoomOrderLogAction', id)
    },
    async createUserDepositAction({ dispatch }, payload) {
      const id = { id: payload.pageId }
      delete payload.pageId
      await createUserDepositRequest(payload)
      dispatch('getPayRoomOrderAction', id)
    },
    async returnDepositAction({ dispatch }, payload) {
      const id = { id: payload.id }
      delete payload.id
      await returnDepositRequest(payload)
      dispatch('getReturnDepositAction', id)
    },
    async getUserListAction({ commit }, payload) {
      const userListResult = await getUserListRequest(payload)
      commit('changeUserList', userListResult.data)
      commit('changeUserListPermission', userListResult.buttonList)
    },
    async getPermissionTreeAction({ commit }) {
      const permissionTreeResult = await getPermissionTreeRequest()
      commit('changePermissionTree', permissionTreeResult.data)
    },
    async getAllRoleAction({ commit }) {
      const allRoleResult = await getAllRoleRequest()
      commit('changeAllRole', allRoleResult.data)
    },
    async updateUserRoleAction({ dispatch }, payload) {
      const reuqestData  = { ...payload }
      reuqestData['userId'] = payload['id']
      delete reuqestData['id']
      const id = { id: payload.pageId }
      await updateUserRoleRequest(reuqestData)
      dispatch('getUserListAction', id)
    },
    async addUserRoleAction({ dispatch }, payload) {
      const id = { id: payload.pageId }
      delete payload.pageId
      await addUserRoleRequest(payload)
      dispatch('getAllRoleAction', id)
    },
    async getReceiveButtonAction({ commit }, payload) {
      const buttonListResult = await getReceiveButtonRequest(payload)
      commit('changeAllRolePermission', buttonListResult.buttonList)
    },
    async updateRoleAction({ dispatch }, payload) {
      await updateRoleRequest(payload)
      dispatch('getAllRoleAction')
    },
    async deleteUserAction(_, payload) {
      await deleteUserRequest(payload)
    },
    async deleteRoleAction({ dispatch }, payload) {
      await deleteRoleRequest(payload)
      dispatch('getAllRoleAction')
    },
    async getGenderDataAction({ commit }) {
      const genderDataResult = await getGenderDataRequest()
      commit('changeGenderData', genderDataResult.data)
    },
    async getOrderDataAction({ commit }) {
      const orderDataResult = await getOrderDataRequest()
      commit('changeOrderData', orderDataResult.data)
    }
  }
}

export default main