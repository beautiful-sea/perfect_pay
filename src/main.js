import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'


Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    items: [],
    initial_balance: 100000000000.0,
    cart: []
  },
  getters: {
    getItemCartById: state => (id) => {
      return state.cart.find(item => item.id === id);
    },
    getBalance: state => {
      var balance = state.initial_balance;
      state.cart.forEach(item => {
        balance -= item.quanty * item.unit_price;
      });
      return balance;
    },
    getTotal: state => {
      return state.initial_balance - store.getters.getBalance;
    }
  },
  mutations: {
    FETCH_ITEMS(state, items) {
      state.items = items
    },
    UPDATE_ITEM_CART(state, newItem) {
      var indexItem = state.cart.findIndex((item => item.id === newItem.id));//BUSCA O INDEX DO ITEM CASO EXISTA
      if (indexItem > -1) state.cart.splice(indexItem, 1);

      if (newItem.quanty > 0) {
        var balance_available = store.state.initial_balance - store.getters.getTotal;//SALDO DISPONIVEL PARA USAR 
        var new_total = store.getters.getTotal + (newItem.quanty * newItem.unit_price);
        var new_balance = balance_available - new_total;

        if ((new_balance) >= 0) {
          state.cart.push(newItem);
          return;
        } else {
          var max_quanty = ((balance_available / newItem.unit_price) - 0.5).toFixed();//MAXIMO DE ITENS PERMITIDOS DE ACORDO COM O SALDO 
          newItem['quanty'] = max_quanty;
          state.cart.push(newItem);
        }
      }

    },
    INCREASE_ITEM_QUANTY(state, idItem) {
      var indexItem = state.cart.findIndex((item => item.id === idItem));
      var item = state.cart[indexItem];
      if (item) {
        item.quanty++;
        Vue.set(state.cart, indexItem, item);
      } else {
        var new_item = state.items.find(item => item.id === idItem);
        new_item['quanty'] = 1;
        state.cart.push(new_item);
      }
    },
    DECREASE_ITEM_QUANTY(state, idItem) {
      var indexItem = state.cart.findIndex((item => item.id === idItem));
      var item = state.cart[indexItem];
      if (item) {
        item.quanty--;
        if (item.quanty > 0) {
          Vue.set(state.cart, indexItem, item);
        } else {
          state.cart.splice(indexItem, 1);
        }

      }
    }
  },
  actions: {
    fetchItems({ commit }) {
      axios
        .get("./json/items.json")
        .then(response => {
          commit("FETCH_ITEMS", response.data.items);
        });
    },
    addItemCart({ commit }, data) {
      data.item['quanty'] = parseInt(data.quanty);
      commit("UPDATE_ITEM_CART", data.item);
    },
    increaseItemQuanty({ commit }, data) {
      commit("INCREASE_ITEM_QUANTY", data.id);
    },
    decreaseItemQuanty({ commit }, data) {
      commit("DECREASE_ITEM_QUANTY", data.id);
    },
  },
});
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
