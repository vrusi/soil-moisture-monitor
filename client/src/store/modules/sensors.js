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

  DELETE_SENSOR(state, sensorID) {
    state.sensors = state.sensors.filter(sensor => sensor.id !== sensorID);
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
  },

  sensorLabelAlreadyExists: state => sensorLabel => {
    return state.sensors.find(sensor => sensor.label === sensorLabel);
  }
};

export default {
  state,
  mutations,
  getters
};
