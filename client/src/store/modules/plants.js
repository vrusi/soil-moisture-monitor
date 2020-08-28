const state = {
  plants: []
};

const mutations = {
  SET_PLANTS(state, plants) {
    state.plants = plants;
  }
};

const actions = {
  initPlants: ({ commit }, plants) => {
    commit("SET_PLANTS", plants);
  }
};

const getters = {
  plants: state => {
    return state.plants;
  },

  plantById: (state) => (id) => {
      return state.plants.find(plant => plant.id === id);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
