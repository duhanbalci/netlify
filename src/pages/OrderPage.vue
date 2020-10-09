<template>
  <q-page class="q-pb-xl">
    <!-- Sepet -->
    <q-dialog
      transition-show="slide-up"
      transition-hide="slide-down"
      :value="$store.state.dialogCart"
      @input="$store.commit('changeDialogCart', $event)"
    >
      <Cart />
    </q-dialog>
    <!-- Sepete ekleme dialogu -->
    <q-dialog
      transition-show="slide-up"
      transition-hide="slide-down"
      v-model="dialog"
    >
      <q-card v-if="dialogProduct" class="bg-blue-1 text-blue-10">
        <q-card-section>
          <div class="text-h6 q-mb-md" style="text-decoration: underline">
            {{ dialogProduct.name }}
          </div>
          <div class="flex q-mb-md">
            <q-input
              type="number"
              filled
              v-model.number="amount"
              label="Miktar"
              stack-label
              dense
              style="max-width: 100px"
            />
            <div class="column">
              <q-btn
                :ripple="false"
                icon="add"
                flat
                size="sm"
                dense
                @click="amount++"
              />
              <q-btn
                :ripple="false"
                icon="remove"
                flat
                size="sm"
                dense
                @click="amount--"
              />
            </div>
          </div>
          <div class="q-mb-md" v-if="dialogProduct.addable.length">
            <div class="text-subtitle2">Eklenebilir Malzemeler</div>
            <q-chip
              :color="dialogProduct.addable[i].value ? 'orange' : 'white'"
              :selected.sync="dialogProduct.addable[i].value"
              v-for="(v, i) in dialogProduct.addable"
              :key="v.name"
            >
              {{ v.name }}{{ v.price !== 0 ? ` - ₺${v.price / 100}` : "" }}
            </q-chip>
          </div>
          <div class="q-mb-md" v-if="dialogProduct.removable.length">
            <div class="text-subtitle2" v-if="dialogProduct.removable">
              Çıkarılabilir Malzemeler
            </div>
            <q-chip
              :color="dialogProduct.removable[i].value ? 'orange' : 'white'"
              :selected.sync="dialogProduct.removable[i].value"
              v-for="(v, i) in dialogProduct.removable"
              :key="v.name"
            >
              {{ v.name }}
            </q-chip>
          </div>
          <div class="text-h6">
            Fiyat: ₺
            {{
              ((dialogProduct.price +
                dialogProduct.addable
                  .filter(v => v.value === true)
                  .map(v => v.price)
                  .reduce((acc, val) => acc + val, 0)) *
                amount) /
                100
            }}
          </div>
          <q-btn color="green" class="q-mt-md full-width" @click="addToCart">
            Sepete Ekle
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Hesap dialogu -->
    <q-dialog
      transition-show="slide-up"
      transition-hide="slide-down"
      :value="$store.state.dialogBill"
      @input="$store.commit('changeDialogBill', $event)"
    >
      <Bill />
    </q-dialog>
    <!-- Tab menü -->
    <q-tabs
      v-model="tab"
      :class="
        $q.dark.isActive
          ? 'bg-blue-grey-10 text-white shadow-2'
          : 'bg-primary text-white shadow-2'
      "
    >
      <q-tab
        :name="l.id"
        :label="l.name"
        v-for="l in $store.state.menu"
        :key="l.id"
      />
    </q-tabs>
    <q-separator />
    <!-- Tabs -->
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      keep-alive
      class="full-height"
    >
      <q-tab-panel
        :name="l.id"
        v-for="l in $store.state.menu"
        :key="l.id"
        class="q-px-none"
      >
        <q-list>
          <template v-for="product in l.products">
            <q-item :key="product.id + 100" class="q-py-none">
              <q-item-section avatar v-if="product.picture">
                <q-img
                  :src="
                    `https://shoppictures.ams3.cdn.digitaloceanspaces.com/${product.picture}`
                  "
                  height="60px"
                  width="60px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ product.name }}</q-item-label>
                <q-item-label caption v-if="product.content">{{
                  product.content
                }}</q-item-label>
                <q-item-label caption v-if="product.description">{{
                  product.description
                }}</q-item-label>
              </q-item-section>

              <q-item-section side top v-if="authenticated">
                <q-badge color="teal" :label="`₺${product.price / 100}`" />
                <q-icon
                  name="add"
                  size="md"
                  color="blue"
                  @click="openDialog(product)"
                />
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
import Cart from "../components/Cart";
import Bill from "../components/Bill";

export default {
  name: "PageIndex",
  components: { Cart, Bill },
  data: () => ({
    cart: [],
    bill: [],
    dialog: false,
    dialogProduct: null,
    amount: 1,
    authenticated: false,
    ws: null,
    wsAlive: false,
    pingInterval: null
  }),
  computed: {
    tab: {
      get() {
        return this.$store.state.tab;
      },
      set(val) {
        this.$store.commit("changeTab", val);
      }
    }
  },
  mounted() {
    this.$store.commit("changeAxios", this.$axios);
    if (this.$route.query.id) {
      this.$store.commit("changeID", this.$route.query.id);
      localStorage.setItem("id", this.$route.query.id);
    } else if (localStorage.getItem("id")) {
      this.$store.commit("changeID", localStorage.getItem("id"));
    } else {
      this.$router.push("/");
    }
    if (this.$route.query.t) {
      localStorage.setItem("token", this.$route.query.t);
      this.$store.commit("changeToken", this.$route.query.t);
      this.checkToken();
    } else {
      if (localStorage.getItem("token")) {
        this.$store.commit("changeToken", localStorage.getItem("token"));
        this.checkToken();
      }
    }
    this.$store.dispatch("fetchMenu");
  },
  methods: {
    async connectWS() {
      this.ws = new WebSocket("wss://ws.tepsi.online:3000");
      this.ws.addEventListener("error", e => {
        console.log("Socket error");
        console.log(e);
        console.log("Closing");
        this.ws.close();
      });
      this.ws.addEventListener("close", e => {
        console.log(
          "Socket is closed. Reconnect will be attempted in 3 second."
        );
        console.log(e);
        setTimeout(() => {
          this.connectWS();
        }, 1000);
      });
      this.ws.addEventListener("open", e => {
        console.log("connected");

        this.wsAlive = true;
        clearInterval(this.pingInterval);
        this.pingInterval = setInterval(() => {
          if (this.wsAlive === false) {
            console.log("biz kapadık moruq");
            this.ws.close();
          }
          this.wsAlive = false;
        }, 10000);

        this.ws.send(
          JSON.stringify({
            event: "tableLogin",
            data: {
              id: this.$store.state.id,
              token: this.$store.state.token
            }
          })
        );
      });
      this.ws.addEventListener("message", e => {
        if (e.data === "ping") {
          this.ws.send("pong");
          this.wsAlive = true;
        } else {
          try {
            const m = JSON.parse(e.data);
            if (m.event === "orderStatusChanged") {
              this.fetchBill();
            }
          } catch (err) {
            console.log("websocket mesajı parse edilemedi");
            console.log(err);
          }
        }
      });
    },
    async checkToken() {
      try {
        await this.$axios.get(`${this.$store.state.URL}/table/checktoken`, {
          headers: {
            authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.authenticated = true;
        await this.fetchBill();
        await this.connectWS();
      } catch (err) {
        console.log(err);
      }
    },
    async fetchBill() {
      this.$store.dispatch("fetchBill");
    },
    openDialog(obj) {
      this.dialog = true;
      this.dialogProduct = {
        ...obj
      };
      this.dialogProduct.addable = this.dialogProduct.addable.map(v => ({
        ...v,
        value: false
      }));
      this.dialogProduct.removable = this.dialogProduct.removable.map(v => ({
        name: v,
        value: false
      }));
    },
    addToCart() {
      this.dialogProduct.amount = this.amount;
      this.$store.commit("addToCart", this.dialogProduct);
      this.dialog = false;
      this.amount = 1;
      this.dialogProduct = null;
    }
  }
};
</script>
