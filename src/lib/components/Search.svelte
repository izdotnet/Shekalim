<script lang="ts">
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
</script>

<div class="relative flex w-full items-baseline mt-auto">
  <div class="mr-2 text-blue-700"><SearchIcon width={24} height={24} /></div>
  <input
    class="search w-full md:w-[14rem] lg:w-72 border-b-2 border-dashed border-b-blue-700 bg-transparent font-sansSerif text-base lg:text-xl text-black outline-none focus:border-solid focus:border-b-blue-500 "
    type="text"
    name="search"
    placeholder="Invoice"
  />
  <button
    class=" bg-blue-600 px-6 py-1 rounded-xl font-sansSerif text-md font-semibold text-white ml-3 hover:bg-blue-500 duration-100 "
    >Search</button
  >
</div>
