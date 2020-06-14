<template>
    <div id="app">
        <Table />
    </div>
</template>

<script>
  import Table from './components/Table';

  export default {
    name: 'App',
    components: {
      Table,
    },
  }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        color: #414141;
        font-size: 14px;
    }

    #app {
        max-width: 100%;
        margin: 0 auto;
    }

    @media (max-width: 1024px) and (max-height: 1366px) {
        #app {
            max-width: 100%;
        }
    }
</style>
