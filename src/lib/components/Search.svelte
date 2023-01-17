<script lang="ts">
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
</script>

<div class="relative flex w-full items-baseline mt-auto">
  <div class="mr-2 text-blue-700"><SearchIcon width={24} height={24} /></div>
  <input
    class="pr-[80px] md:pr-0 search w-full md:w-[14rem] lg:w-72 border-b-[1px] border-dashed border-b-blue-700 bg-transparent font-sansSerif text-base lg:text-lg text-black outline-none focus:border-solid focus:border-b-blue-500 "
    type="text"
    name="search"
    placeholder="Search term"
  />
  <button
    class="pointer-events-auto text-gray-400 absolute left-8 font-sansSerif text-lg font-semibold lg:text-xl transform transition-transform"
    >Search</button
  >
</div>

<style lang="postcss">
  ::placeholder {
    color: transparent;
  }
  input:focus + button,
  input:not(:placeholder-shown) + button {
    @apply left-auto right-3 translate-x-[calc(100%-65px)] rounded-lg px-1 py-1 text-right  md:right-auto md:left-0 md:translate-x-[16rem] lg:translate-x-80;
  }

  input:focus + button:hover,
  input:focus + button:focus {
    @apply bg-blue-700 text-white shadow-lg transition-all duration-200;
  }
</style>
