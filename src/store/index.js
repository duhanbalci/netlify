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
      menu: [],
      cart: [
        {
          id: 58,
          name: "Serpme Kahvaltı",
          price: 4500,
          picture: "e5d9766654910b0726872f1eddf03ccc",
          description:
            "Beyaz peynir, kaşar peyniri, eski kaşar, çeçil peyniri, kızarmış hellim peynir, kızarmış sosis, kızarmış sucuk, salam, karışık zeytin, tahin-pekmez, reçel, bal, kaymak, tereyağı, patates kızartması, sahanda yumurta, poğaça tabağı, domates, salatalık ve sınırsız çay ile.",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:02:10.917Z",
          updatedAt: "2020-09-17T21:02:10.917Z",
          categoryID: 12,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "Pn7-ezVe96YtwoLbmTBwBT0c6cxVozGHsPKiVzi7"
        },
        {
          id: 60,
          name: "Peynir Tabağı",
          price: 1400,
          picture: "a663c3586cd1deff7a3db71c9b7f1db3",
          description:
            "Beyaz peynir, kaşar peynir, çeçil peynir, eski kaşar, tulum peyniri, hellim peynir",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:03:57.875Z",
          updatedAt: "2020-09-17T21:03:57.875Z",
          categoryID: 12,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "26s6xliLA0XVl2hGyL3eJ6jdmkXazOIGXKa1vEf9"
        },
        {
          id: 59,
          name: "Simit Tabağı",
          price: 1200,
          picture: "a9aa9d80ec2ceebb4e90637d1b540550",
          description: "Simit, beyaz peynir, domates, salatalık, zeytin ile",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:03:11.875Z",
          updatedAt: "2020-09-17T21:03:11.875Z",
          categoryID: 12,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "sJqT2jaVfIsVCsPYkFuyb-bT2NQ2kUkih5HQ1Qf8"
        },
        {
          id: 61,
          name: "Mercimek Çorbası",
          price: 800,
          picture: "05e1bd5a2b3b4b40899fc5805918f02e",
          description: "",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:05:08.670Z",
          updatedAt: "2020-09-17T21:05:08.670Z",
          categoryID: 14,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "ZtYd41Fwr95W4Vd7Ug_wquKW0Aue6wqr4tYgXoTm"
        },
        {
          id: 62,
          name: "Tavuk Suyu Çorbası",
          price: 800,
          picture: "035616a007ecce668f269bf223c59ba0",
          description: "",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:05:54.068Z",
          updatedAt: "2020-09-17T21:05:54.068Z",
          categoryID: 14,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "ydsQ5LX5VslByifmG2niFYWBVCKhPZQyURMurvlR"
        },
        {
          id: 65,
          name: "Sezar Salata",
          price: 1500,
          picture: "2bf38d4528169a4945767a599a3102b7",
          description:
            "Izgara tavuk bonfile, göbek, parmesan peyniri, kroton, sezar sos",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:08:21.879Z",
          updatedAt: "2020-09-17T21:08:21.879Z",
          categoryID: 15,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "boiiPXO_6tbej6VJBI2SdQJXUtEF1aavyPo7rsa8"
        },
        {
          id: 64,
          name: "Ton Balıklı Salata",
          price: 1900,
          picture: "ccb6d9d663524abf5efca086dc3a6a20",
          description: "Göbek, turşu, mısır, ton balığı, közlenmiş biber",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:07:46.853Z",
          updatedAt: "2020-09-17T21:10:32.519Z",
          categoryID: 15,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "K0GGba83sw1iDmmmwmj_t4KMtumV9Q696oCEhy9d"
        },
        {
          id: 63,
          name: "Mevsim Salata",
          price: 1500,
          picture: "b0bb3cd658b31150fad0c34a7ada02fe",
          description:
            "Mevsim yeşillikleri, mısır, zeytin, rendelenmiş beyaz peynir",
          contents: [],
          addable: [],
          removable: [],
          createdAt: "2020-09-17T21:07:10.596Z",
          updatedAt: "2020-09-17T21:10:13.117Z",
          categoryID: 15,
          shopID: 1,
          amount: 1,
          add: [],
          remove: [],
          orderID: "9BZxA_hFv2VRLhqICHaHWJb3drFWXFmNr8Fah5yT"
        }
      ],
      bill: [],
      id: null,
      tab: null,
      token: null,
      axios: null,
      URL: "https://app.tepsi.online",
      dialogCart: false,
      dialogBill: false,
      dialogPay: false,
      dialogUser: false
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
      changeDialogUser(state, payload) {
        state.dialogUser = payload;
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
      },
      changeMenu(state, menu) {
        state.menu = menu;
      },
      changeTab(state, tab) {
        state.tab = tab;
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
      },
      async fetchMenu({ commit, state }) {
        const axios = state.axios;
        try {
          const res = await axios.get(`${state.URL}/product/menu/${state.id}`);
          commit("changeMenu", res.data.category);
          commit("changeTableName", res.data.table);
          commit("changeTab", res.data.category[0].id);
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
