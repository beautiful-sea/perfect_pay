<template>
  <div>
    <div class="header">
      <div class="header__inner">
        <a class="header__inner-link" href="#">Neal.fun</a>
      </div>
    </div>
    <div class="container">
      <div class="container__title">
        <img
          class="container__title-image"
          src="https://neal.fun/spend/billgates.jpg"
          alt=""
        />
        Spend Bill Gates' Money
      </div>
      <animated-balance-component :number="balance"></animated-balance-component>
      <div class="container__items">
        <item-component
          v-for="item in items"
          v-bind:item="item"
          v-bind:key="item.id"
        ></item-component>
      </div>
      <receipt-component></receipt-component>
    </div>
    <div>
      <div class="adsense_wrapper"></div>
      <footer-component></footer-component> 
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
import ItemComponent from "./components/Item.vue";
import ReceiptComponent from "./components/Receipt.vue";
import AnimatedBalanceComponent from "./components/AnimatedBalance.vue";
import FooterComponent from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    ItemComponent,
    ReceiptComponent,
    AnimatedBalanceComponent,
    FooterComponent
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    balance() {
      return this.$store.getters.getBalance;
    },
  },
  mounted() {
    this.$store.dispatch("fetchItems", { self: this });
  },
};
</script>

<style lang="sass">
$gradient-green: linear-gradient(180deg, #2ecc71, #1abc9c);

body 
  background-color: #f1f2f6;
  margin: 0px;
  letter-spacing: 0.014rem!important;


*, :after, :before 
  box-sizing: border-box;
  margin: 0;


.header 
  font-size: 30px;
  font-weight: 700;
  padding: 30px 0;
  background-color: #fff;
  margin-bottom: 25px;


.header__inner 
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  max-width: 1000px;


.header__inner-link 
  color: #333;
  font-weight: 700;
  text-decoration: none;
  font-family: Roboto, sans-serif;


.container 
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  color: #333;


.container__title 
  font-size: 32px;
  background: #fff;
  padding: 30px 20px;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
  line-height: 1.3em;
  font-family: Roboto, sans-serif;


.container__title-image 
  display: block;
  width: 125px;
  height: 125px;
  margin: 10px auto 25px;
  border-radius: 125px;


.container__moneybar 
  color: #fff;
  background-color: #2ecc71;
  background: $gradient-green
  padding: 20px;
  margin: 10px 0;
  font-family: Roboto, sans-serif;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  top: 0;
  position: sticky;
  z-index: 9999;



.adsense_wrapper 
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;


</style>
