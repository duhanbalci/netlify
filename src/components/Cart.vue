<template>
  <q-page class="full-height">
    <div class="column full-height">
      <div class="col-auto q-py-md text-center text-h4">
        Tepsim
      </div>
      <q-list class="col" style="overflow: scroll">
        <div v-for="product in cart" :key="product.orderID">
          <q-item class="q-py-none" dense>
            <q-item-section>
              <q-item-label>
                <q-btn
                  icon="clear"
                  color="red"
                  size="md"
                  flat
                  dense
                  @click="$store.commit('removeFromCart', product.orderID)"
                />
                {{ product.name }}
                {{
                  product.amount > 1 ? `X ${product.amount}` : ""
                }}</q-item-label
              >
              <q-item-label caption v-if="product.add.length > 0">
                Ekle:
                {{
                  product.add
                    .map(
                      v =>
                        `${v.name}${
                          v.price !== 0 ? ` - ₺${v.price / 100}` : ""
                        }`
                    )
                    .join(", ")
                }}
              </q-item-label>
              <q-item-label caption v-if="product.remove.length > 0">
                Çıkar: {{ product.remove.join(", ") }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              ₺{{
                ((product.price +
                  product.add
                    .map(v => v.price)
                    .reduce((acc, val) => acc + val, 0)) *
                  product.amount) /
                  100
              }}
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </div>
      </q-list>
      <div class="col-auto q-py-sm">
        <q-item v-if="cart.length > 0">
          <q-item-section>Toplam: </q-item-section>
          <q-item-section side>
            ₺{{
              cart
                .map(
                  v =>
                    (v.price +
                      v.add
                        .map(v => v.price)
                        .reduce((acc, val) => acc + val, 0)) *
                    v.amount
                )
                .reduce((acc, val) => acc + val, 0) / 100
            }}
          </q-item-section>
        </q-item>
        <q-btn no-caps color="green" class="full-width" @click="order"
          >Sipariş Ver</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Cart",
  props: [],
  data: () => ({}),
  computed: {
    ...mapState(["cart"])
  },
  mounted() {},
  methods: {
    async order() {
      for (const p of this.cart) {
        p.add = p.add.map(v => v.id);
      }
      try {
        await this.$axios.post(
          `${this.$store.state.URL}/table/order/${this.$store.state.id}`,
          this.cart,
          {
            headers: {
              authorization: `Bearer ${this.$store.state.token}`
            }
          }
        );
        this.$q.notify({
          type: "positive",
          message: `Siparişin verildi`
        });
        this.$router.push("table");
        this.$store.commit("clearCart");
        await this.$store.dispatch("fetchBill");
      } catch (error) {
        console.log(error);
        this.$q.notify({
          type: "negative",
          message: `Hata: ${error.response.data.message}`
        });
      }
    }
  }
};
</script>
