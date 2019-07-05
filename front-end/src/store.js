import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState()],

  state: {
    vehicles: null,
    vehicle: null,
    loading: false
  },
  mutations: {
    "START_LOADING": state => state.loading = true,
    "STOP_LOADING": state => state.loading = false,
    "SET_VEIHCLES": (state, vehicles) => state.vehicles = vehicles,
    "SET_VEIHCLE": (state, vehicle) => state.vehicle = vehicle
  },
  actions: {
  },
  getters: {
    vehicles: (state) => state.vehicles,
    vehicle: (state) => state.vehicle,
  }
})