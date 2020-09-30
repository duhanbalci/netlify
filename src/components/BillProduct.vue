<template>
  <q-item class="q-px-none" dense>
    <q-item-section>
      <q-item-label>
        {{ product.name }}
        {{ product.amount > 1 ? `X ${product.amount}` : "" }}
        <q-badge
          color="amber"
          label="Bekliyor"
          v-if="product.status === 'waiting'"
        />
        <q-badge
          color="blue"
          label="Hazırlanıyor"
          v-if="product.status === 'approved'"
        />
        <q-badge
          color="green"
          label="Hazır"
          v-if="product.status === 'ready'"
        />
        <q-badge
          color="grey"
          label="Servis Edildi"
          v-if="product.status === 'done'"
        />
      </q-item-label>
      <q-item-label caption v-if="product.addp.length">
        Ekle: {{ product.addp.map(v => v.name).join(", ") }}
      </q-item-label>
      <q-item-label caption v-if="product.remove.length">
        Çıkar: {{ product.remove.join(", ") }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      ₺{{
        ((product.price +
          product.addp.map(v => v.price).reduce((acc, val) => acc + val, 0)) *
          product.amount) /
          100
      }}
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  Name: "BillProduct",
  props: ["product"]
};
</script>
