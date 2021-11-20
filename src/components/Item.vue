<template>
  <div class="container__items-item_card">
    <img v-bind:src="item.image" class="container__items-item_img" />
    <div class="container__items-item_name">{{ item.name }}</div>
    <div class="container__items-item_cost">${{ formatedNumber(item.unit_price) }}</div>
    <div class="container__items-item_controls">
      <button :disabled="item.quanty <= 0||item.quanty == null" :style="(item.quanty > 0)?'background: linear-gradient(180deg,#f53b82,#f53b57)!important;color:white!important':''" class="item_controls-item_sell" v-on:click="decreaseQuanty">Sell</button>
      <input
        pattern="\d*"
        type="number"
        value="0"
        v-model="quantyInCart"
        class="item_controls-item_input"
      />
      <button :class="balance==0||item.unit_price > balance?'item_controls-item_sell':'item_controls-item_buy'" :disabled="balance==0||item.unit_price > balance" v-on:click="increaseQuanty" >Buy</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: { 
    quantyInCart: {
      get() {
        var item = this.$store.getters.getItemCartById(this.item.id);
        var quanty = item ? item.quanty : 0;
        console.log(item)
        return quanty;
      },
      set(newQuanty) {
        this.$store.dispatch("addItemCart", {
          item: this.item,
          quanty: newQuanty,
        });
      },
    },
    balance() {  
      return this.$store.getters.getBalance; 
    },
  },
  methods: {
      formatedNumber(number) {
      var str = number.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    },
    increaseQuanty() { 
        this.$store.dispatch("increaseItemQuanty", {
          id: this.item.id, 
        }); 
    },
    decreaseQuanty() { 
        this.$store.dispatch("decreaseItemQuanty", {
          id: this.item.id, 
        }); 
    },
  },
};
</script>

<style lang="sass">

.container__items 
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 10px 10px;


@media only screen and (max-width: 900px) 
  .container__items 
    grid-template-columns: repeat(2, 1fr);
  


@media only screen and (max-width: 600px) 
  .container__items 
    grid-template-columns: repeat(1, 1fr);
  


.container__items-item_card 
  max-width: 100%;
  background-color: #fff;
  text-align: center;
  font-size: 18px;
  padding: 20px 15px;
  width: 100%;


.container__items-item_img 
  display: block;
  margin: 15px auto;
  height: 120px;
  max-width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;


.container__items-item_name 
  font-size: 22px;
  font-weight: 700;
  font-family: Roboto, sans-serif;


.container__items-item_cost 
  font-size: 20px;
  color: #24c486;
  font-family: Roboto, sans-serif;


.container__items-item_controls 
  font-size: 20px;
  font-weight: 700;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 10px;
  margin-top: 25px;


.item_controls-item_sell 
  background: #f1f2f6 !important;
  border: none;
  color: #333;
  cursor: auto;
  touch-action: manipulation;


.item_controls-item_input 
  padding: 9px 12px;
  border-radius: 3px;
  border: 1px solid #b2bec3;
  color: #333;
  font-family: Roboto, sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;


.item_controls-item_buy 
  background: linear-gradient(180deg, #2ecc71, #1abc9c);


button,
.item_controls-item_input 
  font-size: 16px;
  text-align: center;


button 
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 3px;
  color: #fff;
  border: none;
  font-weight: 700;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;


/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button 
  -webkit-appearance: none;
  margin: 0;


/* Firefox */
input[type="number"] 
  -moz-appearance: textfield;


.container__spree 
  max-width: 100%;
  font-size: 18px;
  padding: 15px 15px 30px;
  margin-top: 10px;


.container__spree-headline 
  font-size: 28px;
  padding: 15px 15px 25px;
  font-weight: 700;


.container__spree,
.container__spree-headline 
  background-color: #fff;
  text-align: center;
  font-family: Roboto, sans-serif;


.container__spree-items 
  max-width: 290px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: grid;
  grid-gap: 10px 0;
  font-size: 18px;
  grid-template-columns: 170px 45px 75px;


.container__spree-items_name 
  text-align: left;
  text-overflow: ellipsis;


.container__spree-items_name,
.container__spree-items_amount 
  text-align: left;


.container__spree-items_cost 
  color: #24c486;
  text-align: right;
  font-weight: 700;


.container__spree-total 
  font-weight: 700;
  max-width: 300px;
  border-top: 1px solid #333;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;


.container__spree-items_cost,
.container__spree-total_money 
  color: #24c486;
  text-align: right;

</style>