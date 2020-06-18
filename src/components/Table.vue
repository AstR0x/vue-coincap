<template>
    <table class="table">
        <TableHeader />
        <TableBody :currencies="currencies" :rows-classes="rowsClasses" />
    </table>
</template>

<script>
  import TableHeader from './TableHeader.vue';
  import TableBody from './TableBody.vue';

  import shortenNumber from '../mixins/shortenNumber';

  import {UPDATE_INTERVAL, DELETE_CLASS_TIME} from '../constants';

  export default {
    name: 'Table',
    components: {
      TableHeader,
      TableBody,
    },
    mixins: [shortenNumber],
    data() {
      return {
        currencies: [],
        rowsClasses: {},
        interval: null,
      }
    },
    methods: {
      updatePrices(prices) {
        const {currencies, rowsClasses, shortenNumber} = this;

        Object.keys(prices).forEach(cryptName => {
          const foundCrypt = currencies.find(crypt => crypt.id === cryptName);
          const currentPrice = shortenNumber(foundCrypt.priceUsd);
          const nextPrice = shortenNumber(prices[cryptName]);

          if (currentPrice !== nextPrice) {
            rowsClasses[cryptName] = currentPrice < nextPrice ? 'green' : 'red';

            setTimeout(() => {
              rowsClasses[cryptName] = null;
            }, DELETE_CLASS_TIME);

            foundCrypt.priceUsd = prices[cryptName];
          }
        });
      },
    },
    async mounted() {
      const response = await fetch('https://api.coincap.io/v2/assets');

      const {data} = await response.json();

      this.currencies = data.sort((a, b) => b.marketCapUsd - a.marketCapUsd).slice(0, 30);

      const initialRowsClasses = this.currencies.reduce((accum, currency) => {
        accum[currency.id] = null;

        return accum;
      }, {});

      this.rowsClasses = {...this.rowsClasses, ...initialRowsClasses};

      const assets = this.currencies.map(crypt => crypt.id).join(',');
      const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets}`);
      const buffer = {prices: {}};

      this.interval = setInterval(() => {
        this.updatePrices(buffer.prices);

        buffer.prices = {};
      }, UPDATE_INTERVAL);

      pricesWs.onmessage = ({data}) => {
        buffer.prices = {...buffer.prices, ...JSON.parse(data)};
      };
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>

<style scoped>
    .table {
        margin: 0 auto;
        width: 50%;
        display: block;
        box-shadow: rgba(0, 0, 0, 0.4) 0 1px 7px -1px;
    }

    @media (max-width: 1024px) and (max-height: 1366px) {
        .table {
            width: 100%;
        }
    }
</style>
