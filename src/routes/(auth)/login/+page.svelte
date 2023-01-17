<script lang="ts">
  import type { PageData } from './$types';
  import Alert from '$lib/components/Alert.svelte';

  // export let data: PageData;

  let email: string;
  let password: string;
  let alertMessage = '';
</script>

<h1 class="auth-heading">Login</h1>

<form action="" class="field flex flex-col gap-y-2">
  <Alert message={alertMessage} />
  <label class="text-yellow-400" for="email">Email Address</label>
  <input type="email" name="email" placeholder="Enter your Email" bind:value={email} />

  <div class="field">
    <div class="flex justify-between">
      <label class="text-yellow-400" for="password">Password</label>
      <a class="text-sm text-white underline hover:no-underline" href="/forgot-password"
        >Forgot password?</a
      >
    </div>
    <input type="password" placeholder="Enter your Password" bind:value={password} />
  </div>

  <div class="field">
    <button type="submit" class="auth-button">Login</button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="underline hover:no-underline">Don't have an account yet?</a>
    </p>
  </div>
</form>

<style class="postcss">
  input {
    @apply w-72;
  }
</style>
