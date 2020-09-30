<template>
  <q-card class="full-width full-height">
    <q-dialog
      :value="$store.state.dialogPay"
      @input="$store.commit('changeDialogPay', $event)"
    >
      <Pay />
    </q-dialog>
    <q-card-section class="full-width column full-height" v-if="bill.length">
      <q-list class="col q-px-sm" style="overflow: scroll">
        <div v-for="product in bill" :key="product.orderID">
          <BillProduct :product="product" />
          <q-separator spaced />
        </div>
      </q-list>
      <div class="col-auto">
        <q-item class="q-px-none" v-if="bill.length">
          <q-item-section>Toplam: </q-item-section>
          <q-item-section side>
            ₺{{
              bill
                .map(
                  v =>
                    (v.price +
                      v.addp
                        .map(v => v.price)
                        .reduce((acc, val) => acc + val, 0)) *
                    v.amount
                )
                .reduce((acc, val) => acc + val, 0) / 100
            }}
          </q-item-section>
        </q-item>
        <q-btn
          color="blue"
          class="full-width"
          @click="$store.commit('changeDialogPay', true)"
          >Hesabı Öde</q-btn
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import BillProduct from "./BillProduct";
import Pay from "./Pay";
import { mapState } from "vuex";
export default {
  name: "Bill",
  components: { BillProduct, Pay },
  data: () => ({}),
  computed: {
    ...mapState(["bill"])
  },
  methods: {}
};
</script>
