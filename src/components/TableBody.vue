<template>
    <tbody class="tbody scroll-delayed">
    <tr v-for="currency in currencies"
        class="table-row"
        :class="[rowsClasses[currency.id]]"
        :key="currency.name">
        <td class="row-cell">{{currency.name}}</td>
        <td class="row-cell">${{shortenNumber(currency.priceUsd)}}</td>
        <td class="row-cell hidden">${{shortenNumber(currency.marketCapUsd)}}</td>
        <td class="row-cell hidden">${{shortenNumber(currency.volumeUsd24Hr)}}</td>
    </tr>
    </tbody>
</template>

<script>
  import shortenNumber from '../mixins/shortenNumber';

  export default {
    name: 'TableBody',
    props: {
      currencies: Array,
      rowsClasses: Object,
    },

    mixins: [shortenNumber],
  }
</script>

<style scoped>
    .tbody {
        display: block;
        visibility: hidden;
        overflow-y: scroll;
        max-height: 95vh;
    }

    .tbody:focus,
    .tbody:hover {
        visibility: visible;
    }

    .scroll-delayed {
        transition: visibility 0.1s;
    }

    .scroll-delayed:hover {
        transition: visibility 0s 0.1s;
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: #999;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: #ffffff;
    }

    ::-webkit-scrollbar-thumb {
        height: 50px;
        background-color: #c7c7c7;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-corner {
        background-color: #999;
    }

    ::-webkit-resizer {
        background-color: #c6c6c6;
    }

    .table-row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px #e6e6e6 solid;
        visibility: visible;
        transition: background-color .1s linear;
    }

    .table-row:hover {
        background-color: #e4e4e4;
    }

    .row-cell {
        width: 25%;
        padding: 15px 0;
        text-align: center;
    }

    .green {
        animation: green 1s linear;
    }

    .red {
        animation: red 1s linear;
    }

    @keyframes green {
        from {
            background-color: #fff;
        }
        50% {
            background-color: #d3f4e8
        }
        to {
            background-color: #fff
        }
    }

    @keyframes red {
        from {
            background-color: #fff;
        }
        50% {
            background-color: #fddbd9
        }
        to {
            background-color: #fff
        }
    }

    @media (max-width: 1024px) and (max-height: 1366px) {
        .row-cell {
            width: 50%;
        }

        .hidden {
            display: none;
        }
    }
</style>
