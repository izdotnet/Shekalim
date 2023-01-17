<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import SnackBar from '$lib/components/SnackBar.svelte';
  import { loadSettings, settings } from '$lib/stores/settingsStore';
  import { cities } from '$lib/utils/cities';
  import { onMount } from 'svelte';

  let mySettings: Settings = {} as Settings;

  onMount(() => {
    loadSettings();
    mySettings = { ...$settings };
  });
</script>

<div class="bg-gray-50 grid grid-cols-12 md:gap-x-16 min-h-screen">
  <SnackBar />
  <Navbar />
  <main
    class="col-span-12 md:col-span-8 md:col-start-4 lg:col-span-6 lg-col-start-5 px-4 pt-4 md:pt-20 "
  >
    <h2>Invoice Details</h2>
    <p class="mb-8">This information gets included on each invoice</p>

    {#if !$settings}
      <p>Loading ...</p>
    {:else}
      <form action="" class="grid grid-cols-6 gap-x-5">
        <div class="field col-span-6">
          <label for="myName">Name</label>
          <input type="text" name="myName" id="myName" bind:value={$settings.myName} />
        </div>

        <div class="field col-span-6">
          <label for="street">Address</label>
          <input type="text" name="street" id="street" bind:value={$settings.street} />
        </div>

        <div class="field col-span-6 md:col-span-2 ">
          <label for="city">City</label>
          <select name="city" id="city" bind:value={$settings.city}>
            <option />
            {#each cities as city}
              <option value={city.value}>{city.name}</option>
            {/each}
          </select>
        </div>

        <div class="field col-span-6 md:col-span-2 ">
          <label for="country">Country</label>
          <select name="country" id="country" bind:value={$settings.country}>
            <option value="Israel">Israel</option>
          </select>
        </div>

        <div class="field col-span-6 md:col-span-2">
          <label for="postalCode">Postal Code</label>
          <input type="text" name="postalCode" id="postalCode" bind:value={$settings.postalCode} />
        </div>

        <div class="field col-span-6 flex justify-end">
          <Button label="Save" isAnimated={true} onClick={() => {}} style="primary" />
        </div>
      </form>
      <div class="col-span-6">
        <h2>Update account information</h2>
        <p class="mb-8">This information is used to access your account</p>
      </div>
    {/if}

    <form action="" class="grid gril-cols-6 gap-x-5">
      <div class="field col-span-6 md:col-span-3">
        <label for="email">Email Address</label>
        <input type="email" name="email" />
      </div>

      <div class="field col-span-6 md:col-span-3">
        <label for="currentPassword">Current Password</label>
        <input type="password" name="currentPassword" id="currentPassword" />
      </div>
      <div class="field col-span-6 md:col-span-3">
        <label for="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" />
      </div>
      <div class="field col-span-6 md:col-span-3">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
      </div>

      <div class="field col-span-6 flex justify-end">
        <Button isAnimated={true} label="Save" onClick={() => {}} />
      </div>
    </form>
  </main>
</div>

<style lang="postcss">
  h2 {
    @apply mb-1 text-3xl font-black text-blue-800;
  }
  p {
    @apply text-sm font-semibold text-gray-400;
  }
</style>
