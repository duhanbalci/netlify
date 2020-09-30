<template>
  <q-card class="full-width">
    <q-card-section class="full-width">
      <q-list>
        <div v-for="product in cart" :key="product.orderID">
          <q-item class="q-py-none">
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
      </q-list>
      <q-btn color="green" class="full-width" @click="order"
        >Siparişi Ver</q-btn
      >
    </q-card-section>
  </q-card>
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
  methods: {
    async order() {
      for (const p of this.cart) {
        p.add = p.add.map(v => v.id);
      }
      try {
        await this.$axios.post(
          `${this.$store.state.URL}/table/order/${this.$route.params.id}`,
          this.cart,
          {
            headers: {
              authorization: `Bearer ${this.$route.params.token}`
            }
          }
        );
        this.$q.notify({
          type: "positive",
          message: `Siparişin verildi`
        });
        this.$store.commit("changeDialogCart", false);
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
