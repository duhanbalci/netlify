<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar
        :class="$q.dark.isActive ? 'bg-blue-grey-10 text-white' : ''"
        style="min-height: 25px"
      >
        <q-toolbar-title>
          Tepsi
        </q-toolbar-title>
        <div>
          <q-toggle
            :value="$q.dark.isActive"
            @input="setDark($event)"
            label="Karanlık Mod"
            :color="$q.dark.isActive ? 'black' : 'black'"
            keep-color
            left-label
          />
          {{ $store.state.tableName }}
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container style="height: 100vh">
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
    <q-footer>
      <q-btn-group spread glossy>
        <q-btn
          size="lg"
          color="positive"
          icon="account_box"
          @click="toggleUser"
        />
        <q-btn
          size="lg"
          color="teal"
          icon="receipt_long"
          :disable="!$store.state.bill.length"
          @click="toggleBill"
        />
        <q-btn
          size="lg"
          :color="$store.state.cart.length ? 'accent' : 'grey'"
          icon="shopping_cart"
          :disable="!$store.state.cart.length"
          @click="toggleCart"
        >
          <q-badge v-show="$store.state.cart.length" color="green" floating>{{
            $store.state.cart.length
          }}</q-badge>
        </q-btn>
      </q-btn-group>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data: () => ({
    user: false
  }),
  methods: {
    setDark(e) {
      if (e) {
        document.body.style.background = "#1D1D1D";
      } else {
        document.body.style.background = "";
      }
      this.$q.dark.set(e);
    },
    toggleUser() {
      if (this.$route.name === "user") {
        this.$router.push({ name: "table" });
      } else {
        this.$router.push({ name: "user" });
      }
    },
    toggleBill() {
      if (this.$route.name === "bill") {
        this.$router.push({ name: "table" });
      } else {
        this.$router.push({ name: "bill" });
      }
    },
    toggleCart() {
      if (this.$route.name === "cart") {
        this.$router.push({ name: "table" });
      } else {
        this.$router.push({ name: "cart" });
      }
    }
  }
};
</script>
