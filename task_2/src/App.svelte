<script lang="ts">
  import { onMount } from 'svelte';
  let currencies = [];
  let rates;
  let baseCurrencyVal = 0;
  let currencyVal = 0;
  let baseCurrency = '';
  let currency = '';
  let isLoading = true;
  let isError = false;

  onMount(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => {
        isLoading = true;
        if (res) {
          return res.json();
        }
      })
      .then(data => {
        if (data && data.result === 'success') {
          currencies = Object.keys(data.rates);
          rates = data.rates;
          baseCurrency = currencies[0];
          currency = 'RUB';
          setTimeout(() => {
            isLoading = false;
          }, 500);
        } else {
          isError = true;
          isLoading = false;
        }
      })
      .catch(err => {
        console.log(err);
        isError = true;
      })
  });

  function handleSelectBaseCurrency() {
    isLoading = true;
    baseCurrencyVal = 0;
    currencyVal = 0;
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then(res => {
        if (res) {
          return res.json();
        }
      })
      .then(data => {
        if (data && data.result === 'success') {
          rates = data.rates;
          setTimeout(() => {
            isLoading = false;
          }, 500);
        } else {
          isError = true;
          isLoading = false;
        }
      })
      .catch(err => {
        console.log(err);
        isError = true;
      })
  }

  function handleSelectCurrency() {
    handleBaseCurrencyVal();
  }

  function handleBaseCurrencyVal() {
    currencyVal = Math.round(baseCurrencyVal * rates[currency] * 100) / 100 ;
  }
  function handleCurrencyVal(e) {
    baseCurrencyVal = Math.round(currencyVal / rates[currency] * 100) / 100;
  }
</script>

<main class="main">
  {#if isLoading}
    <p>Loading...</p>
  {:else if isError}
    <p>Произошла ошибка, перезагрузите страницу</p>   
  {:else}
  <div>
    <select bind:value={baseCurrency} on:change={handleSelectBaseCurrency}>
      {#each currencies as currency}
        <option value={currency}>
          {currency}
        </option>
      {/each}
    </select>
    <select bind:value={currency} on:change={handleSelectCurrency}>
      {#each currencies as currency}
        <option value={currency}>
          {currency}
        </option>
      {/each}
    </select>
  </div>
  <div>
    <input min="0" type="number" bind:value={baseCurrencyVal} on:input={handleBaseCurrencyVal}/>
    <input min="0" type="number" bind:value={currencyVal} on:input={handleCurrencyVal}/>
  </div>
  {/if}
</main>

<style>
main {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
  select {
    width: 100%;
  }
  div {
    display: flex;
    gap: 15px;
  }

</style>
