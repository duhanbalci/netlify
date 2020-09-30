import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      tableName: "",
      darkMode: false,
      cart: [],
      bill: [],
      id: null,
      token: null,
      axios: null,
      URL: "https://app.tepsi.online",
      dialogCart: false,
      dialogBill: false,
      dialogPay: false
    },
    mutations: {
      changeDarkMode(state, payload) {
        state.darkMode = payload;
      },
      changeDialogPay(state, payload) {
        state.dialogPay = payload;
      },
      changeDialogCart(state, payload) {
        state.dialogCart = payload;
      },
      changeDialogBill(state, payload) {
        state.dialogBill = payload;
      },
      changeAxios(state, axios) {
        state.axios = axios;
      },
      changeID(state, id) {
        state.id = id;
      },
      changeToken(state, token) {
        state.token = token;
      },
      changeTableName(state, payload) {
        state.tableName = payload;
      },
      removeFromCart(state, id) {
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].orderID == id) {
            state.cart.splice(i, 1);
          }
        }
      },
      addToCart(state, product) {
        product.add = product.addable.filter(v => v.value === true);
        product.remove = product.removable
          .filter(v => v.value === true)
          .map(v => v.name);
        product.orderID = nanoid(40);
        state.cart.push(product);
      },
      clearCart(state) {
        state.cart = [];
      },
      changeBill(state, bill) {
        state.bill = bill;
      }
    },
    actions: {
      async fetchBill({ commit, state }) {
        const axios = state.axios;
        try {
          const res = await axios.get(`${state.URL}/table/bill/${state.id}`, {
            headers: {
              authorization: `Bearer ${state.token}`
            }
          });
          const p = res.data.map(v => v.products).flat(1);
          const bill = [];
          for (let i = 0; i < p.length; i++) {
            bill.push({
              id: p[i].id,
              name: p[i].name,
              amount: p[i].amount,
              addp: p[i].addp,
              remove: p[i].remove,
              price: p[i].price,
              status: p[i].status
            });
          }
          commit("changeBill", bill);
        } catch (err) {
          console.log(err);
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
