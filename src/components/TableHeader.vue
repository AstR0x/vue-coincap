<template>
    <thead class="table-header">
    <tr class="table-row">
        <th class="header-cell">Name</th>
        <th class="header-cell">Price</th>
        <th class="header-cell hidden">Market Cap</th>
        <th class="header-cell hidden">Volume (24h)</th>
    </tr>
    </thead>
</template>

<script>
  export default {
    name: 'TableHeader',
  }
</script>

<style scoped>
    .table-header {
        height: 5vh;
        display: block;
    }

    .table-row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dddddd;
    }

    .header-cell {
        width: 25%;
        padding: 10px;
        text-align: center;
        border: 1px solid #fff;
        background-color: rgba(253, 255, 240, 0.6);
    }

    @media (max-width: 1024px) and (max-height: 1366px) {
        .header-cell {
            width: 50%;
        }

        .hidden {
            display: none;
        }
    }
</style>
