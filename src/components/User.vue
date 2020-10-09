<template>
  <q-page class="q-pa-sm" :class="$q.dark.isActive ? 'bg-dark' : 'bg-lime-2'">
    <div class="text-subtitle1">Merhaba Duhan Balcı</div>
    <div>
      <div>Son Harcamalarınız</div>
      <q-list class="q-mt-sm">
        <q-item
          dense
          v-for="v in lastCharges"
          :key="v.i"
          class="row q-pa-none q-px-sm items-center full-width bg-amber-6 q-mt-xs"
        >
          <span class="col-auto"> {{ v.date.toLocaleDateString() }} </span>
          <span class="col q-pl-md"> {{ v.name }} </span>
          <span class="col-auto"> ₺{{ v.price / 100 }} </span>
        </q-item>
      </q-list>
    </div>
    <div class="q-mt-lg">
      <div>Ödeme Yöntemleriniz</div>
      <q-list class="q-mt-sm">
        <q-item
          dense
          v-for="v in cards"
          :key="v.i"
          class="row q-pa-none q-px-sm items-center full-width bg-accent q-mt-xs"
        >
          <span class="col-auto"> {{ v.name }} </span>
          <span class="col text-right text-h6"> {{ v.number }} </span>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "User",
  data: () => ({
    lastCharges: [
      { id: 1, name: "Falan filan restoran", date: new Date(), price: 8400 },
      { id: 2, name: "Falan filan restoran", date: new Date(), price: 12400 },
      { id: 3, name: "Falan filan restoran", date: new Date(), price: 4800 }
    ],
    cards: [
      { id: 1, name: "MasterCard", number: "XXXX XXXX XXXX XX15" },
      { id: 2, name: "MasterCard", number: "XXXX XXXX XXXX XX15" }
    ]
  })
};
</script>
