const state = {
  plants: []
};

const mutations = {
  SET_PLANTS(state, plants) {
    state.plants = plants;
  },

  UPDATE_PLANT(state, updatedPlant) {
    state.plants = state.plants.map(plant => {
      if (plant.id === updatedPlant.id) return updatedPlant;
      else return plant;
    });
  },

  ADD_PLANT(state, plant) {
    state.plants.push(plant);
  },

  DELETE_PLANT(state, plantID) {
    state.plants = state.plants.filter(plant => plant.id !== plantID);
  }
};

const getters = {
  plants: state => {
    return state.plants;
  },

  plantByID: state => id => {
    return state.plants.find(plant => plant.id === id);
  }
};

export default {
  state,
  mutations,
  getters
};
