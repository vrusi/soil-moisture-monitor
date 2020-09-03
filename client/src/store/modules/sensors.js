const state = {
  sensors: []
};

const mutations = {
  SET_SENSORS(state, sensors) {
    state.sensors = sensors;
  },

  UPDATE_SENSOR(state, updatedSensor) {
    state.sensors = state.sensors.map(sensor => {
      if (sensor.id === updatedSensor.id) return updatedSensor;
      else return sensor;
    });
  },

  ADD_SENSOR(state, sensor) {
    state.sensors.push(sensor);
  },

  DELETE_SENSOR(state, sensor) {
    state.sensors.splice(state.sensors.indexOf(sensor.id));
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
  },

  sensorByPlantID: state => plantID => {
    return state.sensors.find(sensor => sensor.plantID === plantID);
  },

  sensorByID: state => sensorID => {
    return state.sensors.find(sensor => sensor.id === sensorID);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
