<template>
  <q-card>
    <q-card-section class="text-h4 text-center">
      HESAP ÖDEME
    </q-card-section>
    <q-card-section class="row">
      <div class="col-12 q-pa-xs">
        <q-btn
          push
          color="primary"
          :ripple="false"
          class="full-width q-px-xs q-py-md text-h5"
        >
          ONLİNE
        </q-btn>
      </div>
      <div class="col-6 q-pa-xs">
        <q-btn
          push
          color="primary"
          :ripple="false"
          class="full-width q-px-xs q-py-md text-h5"
          @click="pay('cash')"
        >
          NAKİT
        </q-btn>
      </div>
      <div class="col-6 q-pa-xs">
        <q-btn
          push
          color="primary"
          :ripple="false"
          class="full-width q-px-xs q-py-md text-h5"
          @click="pay('pos')"
        >
          POS
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Pay",
  methods: {
    async pay(type) {
      await this.$axios.post(
        `${this.$store.state.URL}/table/reqbill`,
        {
          type
        },
        {
          headers: {
            authorization: `Bearer ${this.$store.state.token}`
          }
        }
      );
    }
  }
};
</script>
