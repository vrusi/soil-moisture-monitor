const state = {
  sensors: []
};

const mutations = {
  SET_SENSORS(state, sensors) {
    state.sensors = sensors;
  }
};

const actions = {
  initSensors: ({ commit }, sensors) => {
    commit("SET_SENSORS", sensors);
  }
};

const getters = {
  sensors: state => {
    return state.sensors;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
