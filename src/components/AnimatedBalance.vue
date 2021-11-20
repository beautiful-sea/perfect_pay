<template>
  <div class="container__moneybar">${{ formatedNumber }}</div>
</template>

<script>
export default {
  props: ["number"],
  data() {
    return {
      displayNumber: this.number,
      interval: false, 
    };
  },
  computed: {
    formatedNumber() {
      var str = this.displayNumber.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    },
  },
  ready() {
    this.displayNumber = this.number ? this.number : 100000000;
  },
  watch: {
    number() {
      clearInterval(this.interval);

      if (this.number == this.displayNumber) {
        return;
      }
      this.interval = window.setInterval(() => {
        if(this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 20);
    },
  },
};
</script>