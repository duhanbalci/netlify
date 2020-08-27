<template>
  <q-page class="">
    <q-tabs
        v-model="tab"
        class="bg-primary text-white shadow-2"
      >
        <q-tab :name="l.name" :label="l.label" v-for="l in list" :key="l.id" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel :name="l.name" v-for="l in list" :key="l.id">
            <q-list>
              <template v-for="product in l.products">
                <q-item :key="product.id">
                  <q-item-section>
                    <q-item-label>{{product.name}}</q-item-label>
                    <q-item-label caption v-if="product.content">{{product.content}}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge color="teal" :label="`₺${product.price/10}`" />
                  </q-item-section>
                </q-item>
                <q-separator spaced inset :key="product.id" />
              </template>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
    tab: 'icecek',
    list: [
      {
        id: 1,
        name: 'icecek',
        label: 'İçecek',
        products: [
          { id: 1, name: 'Ayran', price: 300, picture: '' },
          { id: 2, name: 'Coca-Cola', price: 550, picture: '' },
          { id: 3, name: 'Fanta', price: 450, picture: '' },
          { id: 4, name: 'Sprite', price: 350, picture: '' },
          { id: 5, name: 'Ice Tea', price: 650, picture: '' },
          { id: 6, name: 'Meyve Suyu', price: 700, picture: '' }
        ]
      },
      {
        id: 2,
        name: 'bira',
        label: 'Bira',
        products: [
          { id: 1, name: 'Efes Özel Seri 50 cl', price: 3000, picture: '' },
          { id: 2, name: 'Efes Malt 50 cl', price: 5500, picture: '' },
          { id: 3, name: 'Bomonti Fabrika 50 c', price: 4500, picture: '' },
          { id: 4, name: 'Duvel 33 cl', price: 3500, picture: '' },
          { id: 5, name: 'Miller 33 cl', price: 3000, picture: '' },
          { id: 6, name: 'Beck’s 33 cl', price: 3500, picture: '' }
        ]
      },
      {
        id: 3,
        name: 'makarna',
        label: 'Makarna',
        products: [
          { id: 1, name: 'Beş Peynirli Ravioli', price: 3000, content: 'Seçiminize göre domates veya krema sosu ile', picture: '' },
          { id: 2, name: 'Penne all’Arrabbiata', price: 5500, content: 'Soğan, sarımsak, acı domates sos ile', picture: '' },
          { id: 3, name: 'Tagliatelle Alfredo', price: 4500, content: 'Pestolu krema, mantar ve parmesan ile', picture: '' },
          { id: 4, name: 'Penne Alla Carne', price: 3500, content: 'Jülyen et, mantar, karamelize soğan, sarımsak, roka,pestolu krema sos ile', picture: '' },
          { id: 5, name: 'Fettuccine Chicken Al Pesto', price: 3000, content: 'Sote tavuk şeritleri, mantar, kırmızı ve yeşil biber,pestolu krema sos ile', picture: '' }
        ]
      },
      {
        id: 4,
        name: 'tatli',
        label: 'Tatlı',
        products: [
          { id: 1, name: 'Çikolatalı Karayip Katları', price: 3000, content: 'Çikolatalı ıslak kek dilimleri arasında dondurma,fıstık krokan ve damla çikolata parçaları', picture: '' },
          { id: 2, name: 'Ice Crash', price: 5500, content: 'Kremalı milföy katları arasına mevsim meyveleri,dondurma, frambuaz sos ve çikolata sos ile', picture: '' }
        ]
      }
    ]
  })
}
</script>
