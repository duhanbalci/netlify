<template>
  <q-page class="">
    <q-dialog
      transition-show="slide-up"
      transition-hide="slide-down"
      v-model="dialogCart"
    >
      <q-card class="full-width">
        <q-card-section class="full-width">
          <q-list>
            <div v-for="product in cart" :key="product.id">
              <q-item :key="product.id" class="q-py-none">
                <q-item-section>
                  <q-item-label>{{product.name}} {{product.amount > 1 ? `X ${product.amount}` : ''}}</q-item-label>
                  <q-item-label caption v-if="product.add.length > 0">
                    Ekle: {{product.add.join(', ')}}
                  </q-item-label>
                  <q-item-label caption v-if="product.remove.length > 0">
                    Çıkar: {{product.remove.join(', ')}}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  ₺{{product.price/100*product.amount}}
                </q-item-section>
              </q-item>
              <q-separator spaced inset :key="product.id" />
            </div>
            <q-item v-if="cart.length > 0">
                <q-item-section>Toplam: </q-item-section>
                <q-item-section side>
                  ₺{{(cart.map(v => v.price * v.amount).reduce((acc, val) => acc + val)) / 100}}
                </q-item-section>
              </q-item>
          </q-list>
          <q-btn color="green" class="full-width">Siparişi Ver</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      transition-show="slide-up"
      transition-hide="slide-down"
      v-model="dialog"
    >
      <q-card v-if="dialogProduct" class="bg-blue-1 text-blue-10">
        <q-card-section>
          <div class="text-h6 q-mb-md" style="text-decoration: underline">{{dialogProduct.name}}</div>
          <div class="flex q-mb-md">
            <q-input type="number" filled v-model.number="amount" label="Miktar" stack-label dense style="max-width: 100px"/>
            <div class="column">
              <q-btn :ripple="false" icon="add" flat size="sm" dense @click="amount++"/>
              <q-btn :ripple="false" icon="remove" flat size="sm" dense @click="amount--"/>
            </div>
          </div>
          <div class="q-mb-md" v-if="addable">
            <div class="text-subtitle2">Eklenebilir Malzemeler</div>
              <q-chip :color="addable[i].value ? 'orange' : 'white'" :selected.sync="addable[i].value" v-for="(v, i) in addable" :key="v">
                {{v.name}}
              </q-chip>
          </div>
          <div class="q-mb-md" v-if="removable">
            <div class="text-subtitle2" v-if="removable">Çıkarılabilir Malzemeler</div>
            <q-chip :color="removable[i].value ? 'orange' : 'white'" :selected.sync="removable[i].value" v-for="(v, i) in removable" :key="v">
                {{v.name}}
              </q-chip>
          </div>
          <q-btn color="green" class="q-mt-md full-width" @click="addToCart">
            Sepete Ekle
          </q-btn>
        </q-card-section>
      </q-card>

    </q-dialog>
    <q-tabs
        v-model="tab"
        class="bg-primary text-white shadow-2"
      >
        <q-tab :name="l.name" :label="l.label" v-for="l in list" :key="l.id" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated swipeable keep-alive>
          <q-tab-panel :name="l.name" v-for="l in list" :key="l.id" class="q-px-none">
            <q-list>
              <template v-for="product in l.products">
                <q-item :key="product.id" class="q-py-none">
                  <q-item-section avatar v-if="product.picture">
                    <q-img :src="product.picture" height="60px" width="60px"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{product.name}}</q-item-label>
                    <q-item-label caption v-if="product.content">{{product.content}}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge color="teal" :label="`₺${product.price/100}`" />
                    <q-icon name="add" size="md" color="blue" @click="openDialong(product)" />
                  </q-item-section>
                </q-item>
                <q-separator spaced inset :key="product.id" />
              </template>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="shopping_cart" color="accent" @click="dialogCart = true">
            <q-badge color="green" floating>{{cart.length}}</q-badge>
          </q-btn>
        </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    openDialong (obj) {
      // this.cart.push(obj)
      this.dialog = true
      this.dialogProduct = obj
    },
    addToCart () {
      this.dialogProduct.add = this.addable.filter(v => v.value === true).map(v => v.name)
      this.dialogProduct.remove = this.removable.filter(v => v.value === true).map(v => v.name)
      this.dialogProduct.amount = this.amount
      this.cart.push(this.dialogProduct)
      this.addable = this.addable.map(v => {
        v.value = false
        return v
      })
      this.removable = this.removable.map(v => {
        v.value = false
        return v
      })
      this.dialog = false
    }
  },
  data: () => ({
    tab: 'icecek',
    cart: [],
    dialog: false,
    dialogCart: false,
    dialogProduct: null,
    amount: 1,
    addable: [{ name: 'peynir', value: false }, { name: 'soğan', value: false }],
    removable: [{ name: 'turşu', value: false }, { name: 'mantar', value: false }, { name: 'soğan', value: false }],
    list: [
      {
        id: 1,
        name: 'icecek',
        label: 'İçecek',
        products: [
          { id: 1, name: 'Ayran', price: 300, picture: 'https://www.marketimgeldi.com/Uploads/UrunResimleri/buyuk/sutas-bardak-ayran-200-ml.-099c.jpg' },
          { id: 2, name: 'Coca-Cola', price: 550, picture: 'https://productimages.hepsiburada.net/s/10/375/9219505782834.jpg' },
          { id: 3, name: 'Fanta', price: 450, picture: 'https://ayb.akinoncdn.com/products/2019/02/14/1658/f05a42ea-01bd-4e84-a8b3-72e050eb6938.jpg' },
          { id: 4, name: 'Sprite', price: 350, picture: 'https://cdn.cimri.io/image/1000x1000/spritexmlgazoz_214560733.jpg' },
          { id: 5, name: 'Ice Tea', price: 650, picture: 'https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30088183/30088183_0_MC/8796873162802_1578310101979.jpg' },
          { id: 6, name: 'Meyve Suyu', price: 700, picture: 'https://www.hapeloglu.com/ulker-icim-karisik-meyve-suyu-200ml-10340-meyve-suyu-icim-3360-10-B.jpg' }
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
          { id: 1, name: 'Beş Peynirli Ravioli', price: 3000, content: 'Seçiminize göre domates veya krema sosu ile', picture: 'https://gastromanya.com/wp-content/uploads/2017/03/rivoli.jpg' },
          { id: 2, name: 'Penne all’Arrabbiata', price: 5500, content: 'Soğan, sarımsak, acı domates sos ile', picture: 'https://www.giallozafferano.it/images/ricette/197/19779/foto_hd/hd650x433_wm.jpg' },
          { id: 3, name: 'Tagliatelle Alfredo', price: 4500, content: 'Pestolu krema, mantar ve parmesan ile', picture: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg' },
          { id: 4, name: 'Penne Alla Carne', price: 3500, content: 'Jülyen et, mantar, karamelize soğan, sarımsak, roka,pestolu krema sos ile', picture: 'https://image.zmenu.com/large/215858/20140629044353184816.jpg' },
          { id: 5, name: 'Fettuccine Chicken Al Pesto', price: 3000, content: 'Sote tavuk şeritleri, mantar, kırmızı ve yeşil biber,pestolu krema sos ile', picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fay%2F06%2Fpesto-fettuccine-ay-1875453-x.jpg%3Fitok%3DsUKjb2nr' },
          { id: 6, name: 'Beş Peynirli Ravioli', price: 3000, content: 'Seçiminize göre domates veya krema sosu ile', picture: 'https://gastromanya.com/wp-content/uploads/2017/03/rivoli.jpg' },
          { id: 7, name: 'Penne all’Arrabbiata', price: 5500, content: 'Soğan, sarımsak, acı domates sos ile', picture: 'https://www.giallozafferano.it/images/ricette/197/19779/foto_hd/hd650x433_wm.jpg' },
          { id: 8, name: 'Tagliatelle Alfredo', price: 4500, content: 'Pestolu krema, mantar ve parmesan ile', picture: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg' },
          { id: 9, name: 'Penne Alla Carne', price: 3500, content: 'Jülyen et, mantar, karamelize soğan, sarımsak, roka,pestolu krema sos ile', picture: 'https://image.zmenu.com/large/215858/20140629044353184816.jpg' },
          { id: 10, name: 'Fettuccine Chicken Al Pesto', price: 3000, content: 'Sote tavuk şeritleri, mantar, kırmızı ve yeşil biber,pestolu krema sos ile', picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fay%2F06%2Fpesto-fettuccine-ay-1875453-x.jpg%3Fitok%3DsUKjb2nr' },
          { id: 11, name: 'Beş Peynirli Ravioli', price: 3000, content: 'Seçiminize göre domates veya krema sosu ile', picture: 'https://gastromanya.com/wp-content/uploads/2017/03/rivoli.jpg' },
          { id: 12, name: 'Penne all’Arrabbiata', price: 5500, content: 'Soğan, sarımsak, acı domates sos ile', picture: 'https://www.giallozafferano.it/images/ricette/197/19779/foto_hd/hd650x433_wm.jpg' },
          { id: 13, name: 'Tagliatelle Alfredo', price: 4500, content: 'Pestolu krema, mantar ve parmesan ile', picture: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg' },
          { id: 14, name: 'Penne Alla Carne', price: 3500, content: 'Jülyen et, mantar, karamelize soğan, sarımsak, roka,pestolu krema sos ile', picture: 'https://image.zmenu.com/large/215858/20140629044353184816.jpg' },
          { id: 15, name: 'Fettuccine Chicken Al Pesto', price: 3000, content: 'Sote tavuk şeritleri, mantar, kırmızı ve yeşil biber,pestolu krema sos ile', picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fay%2F06%2Fpesto-fettuccine-ay-1875453-x.jpg%3Fitok%3DsUKjb2nr' }
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
