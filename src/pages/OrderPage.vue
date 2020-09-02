<template>
  <q-page class="q-pb-xl">
    <!-- Sepet -->
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialogCart">
      <q-card class="full-width">
        <q-card-section class="full-width">
          <q-list>
            <div v-for="product in cart" :key="product.id">
              <q-item class="q-py-none">
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
              <q-separator spaced inset />
            </div>
            <q-item v-if="cart.length > 0">
              <q-item-section>Toplam: </q-item-section>
              <q-item-section side>
                ₺{{(cart.map(v => v.price * v.amount).reduce((acc, val) => acc + val)) / 100}}
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn color="green" class="full-width" @click="order">Siparişi Ver</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Sepete ekleme dialogu -->
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialog">
      <q-card v-if="dialogProduct" class="bg-blue-1 text-blue-10">
        <q-card-section>
          <div class="text-h6 q-mb-md" style="text-decoration: underline">{{dialogProduct.name}}</div>
          <div class="flex q-mb-md">
            <q-input type="number" filled v-model.number="amount" label="Miktar" stack-label dense
              style="max-width: 100px" />
            <div class="column">
              <q-btn :ripple="false" icon="add" flat size="sm" dense @click="amount++" />
              <q-btn :ripple="false" icon="remove" flat size="sm" dense @click="amount--" />
            </div>
          </div>
          <div class="q-mb-md" v-if="dialogProduct.addable.length">
            <div class="text-subtitle2">Eklenebilir Malzemeler</div>
            <q-chip :color="dialogProduct.addable[i].value ? 'orange' : 'white'"
              :selected.sync="dialogProduct.addable[i].value" v-for="(v, i) in dialogProduct.addable" :key="v.name">
              {{v.name}}
            </q-chip>
          </div>
          <div class="q-mb-md" v-if="dialogProduct.removable.length">
            <div class="text-subtitle2" v-if="dialogProduct.removable">Çıkarılabilir Malzemeler</div>
            <q-chip :color="dialogProduct.removable[i].value ? 'orange' : 'white'"
              :selected.sync="dialogProduct.removable[i].value" v-for="(v, i) in dialogProduct.removable" :key="v.name">
              {{v.name}}
            </q-chip>
          </div>
          <q-btn color="green" class="q-mt-md full-width" @click="addToCart">
            Sepete Ekle
          </q-btn>
        </q-card-section>
      </q-card>

    </q-dialog>
    <!-- Hesap dialogu -->
    <q-dialog transition-show="slide-up" transition-hide="slide-down" v-model="dialogBill">
      <q-card class="full-width">
        <q-card-section class="full-width">
          <q-list>
            <div v-for="product in bill" :key="product.id">
              <q-item class="q-py-none">
                <q-item-section>
                  <q-item-label>{{product.name}} {{product.amount > 1 ? `X ${product.amount}` : ''}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  ₺{{product.price/100*product.amount}}
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
            </div>
            <q-item v-if="bill.length > 0">
              <q-item-section>Toplam: </q-item-section>
              <q-item-section side>
                ₺{{(bill.map(v => v.price * v.amount).reduce((acc, val) => acc + val)) / 100}}
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn color="green" class="full-width" @click="order">Siparişi Ver</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Tab menü -->
    <q-tabs v-model="tab" class="bg-primary text-white shadow-2">
      <q-tab :name="l.id" :label="l.name" v-for="l in list" :key="l.id" />
    </q-tabs>
    <q-separator />
    <!-- Tabs -->
    <q-tab-panels v-model="tab" animated swipeable keep-alive>
      <q-tab-panel :name="l.id" v-for="l in list" :key="l.id" class="q-px-none">
        <q-list>
          <template v-for="product in l.products">
            <q-item :key="product.id+100" class="q-py-none">
              <q-item-section avatar v-if="product.picture">
                <q-img :src="`https://app.dhnprojects.tk/${product.picture}`" height="60px" width="60px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{product.name}}</q-item-label>
                <q-item-label caption v-if="product.content">{{product.content}}</q-item-label>
                <q-item-label caption v-if="product.description">{{product.description}}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-badge color="teal" :label="`₺${product.price/100}`" />
                <q-icon name="add" size="md" color="blue" @click="openDialog(product)" />
              </q-item-section>
            </q-item>
            <q-separator spaced inset :key="product.id" />
          </template>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-show="cart.length > 0">
      <q-btn fab icon="shopping_cart" color="accent" @click="dialogCart = true">
        <q-badge color="green" floating>{{cart.length}}</q-badge>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-left" :offset="[18, 18]" v-show="bill.length > 0">
      <q-btn fab icon="receipt_long" color="teal" @click="dialogBill = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
  let URL
  if (process.env.DEV) {
    URL = 'http://192.168.0.105:3000'
  } else {
    URL = 'https://app.dhnprojects.tk'
  }
  export default {
    name: 'PageIndex',
    methods: {
      openDialog(obj) {
        // this.cart.push(obj)
        this.dialog = true
        this.dialogProduct = {
          ...obj
        }
        this.dialogProduct.addable = this.dialogProduct.addable.map(v => ({
          name: v,
          value: false
        }))
        this.dialogProduct.removable = this.dialogProduct.removable.map(v => ({
          name: v,
          value: false
        }))
      },
      addToCart() {
        this.dialogProduct.add = this.dialogProduct.addable.filter(v => v.value === true).map(v => v.name)
        this.dialogProduct.remove = this.dialogProduct.removable.filter(v => v.value === true).map(v => v.name)
        this.dialogProduct.amount = this.amount
        this.cart.push(this.dialogProduct)
        this.dialog = false
        this.amount = 1
        this.dialogProduct = null
      },
      async fetchMenu() {
        const res = await this.$axios.get(`${URL}/product/menu/${this.$route.params.id}/${this.$route.params.token}`)
        this.list = res.data.category
        this.tab = this.list[0].id
        const p = res.data.products
        this.$store.commit('changeTableName', res.data.table)
        for(let i = 0; i < p.length; i++) {
          this.bill.push({
            id: p[i].id,
            name: p[i].name,
            amount: p[i].amount,
            add: p[i].add,
            remove: p[i].remove,
            price: p[i].price
          })
        }
      },
      async order() {

        try {
          await this.$axios.post(`${URL}/table/order/${this.$route.params.id}`, this.cart, {
            headers: {
              authorization: `Bearer ${this.$route.params.token}`
            }
          })
          this.$q.notify({
            type: 'positive',
            message: `Siparişin verildi`
          })
          this.dialogCart = false
          this.cart = []
          const res = await this.$axios.get(`${URL}/product/menu/${this.$route.params.id}/${this.$route.params.token}`)
          for(let i = 0; i < p.length; i++) {
            this.bill.push({
              id: p[i].id,
              name: p[i].name,
              amount: p[i].amount,
              add: p[i].add,
              remove: p[i].remove,
              price: p[i].price
            })
          }
        } catch(error) {
          console.log(error)
          this.$q.notify({
            type: 'negative',
            message: `Hata: ${error.response.data.message}`
          })
        }
      }
    },
    mounted() {
      this.fetchMenu()
    },
    data: () => ({
      tab: '',
      cart: [],
      bill: [],
      dialog: false,
      dialogBill: false,
      dialogCart: false,
      dialogProduct: null,
      amount: 1,
      list: []
    })
  }

</script>
