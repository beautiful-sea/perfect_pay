<template>
  <div class="container__spree" v-show="itemsInCart.length > 0">
    <div class="container__spree-headline">Your Receipt</div>
    <div
      class="container__spree-items"
      v-for="item in itemsInCart"
      v-bind:key="item.id"
    >
      <div class="container__spree-items_name">{{ item.name }}</div>
      <div class="container__spree-items_amount">x{{ formatedKMB(item.quanty) }}</div>
      <div class="container__spree-items_cost">
        ${{ formatedKMB(subTotal(item)) }}
      </div>
    </div>
    <div class="container__spree-total">
      <span>TOTAL</span>
      <div class="container__spree-total_money">${{ formatedNumber(total) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    itemsInCart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.getTotal;
    },
  },
  methods: { 
      formatedNumber(number) {
      var str = number.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    },
    subTotal(item) {
      return item.quanty * item.unit_price;
    },
    formatedKMB(number) { 
      if (number >= 1000 && number < 1000000) {
        number = (number / 1000).toFixed() + "k";
      } else if (number >= 1000000 && number < 1000000000) {
        number = (number / 1000000).toFixed() + "m";
      }else if ((number >= 1000000000) && number <= 100000000000) {
        number = (number / 1000000000).toFixed() + "b";
      }
      return number;
    },
  },
};
</script>