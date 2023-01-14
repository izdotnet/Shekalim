<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import Button from '$lib/components/Button.svelte';
  import { deleteInvoice } from '$lib/stores/invoiceStore';
  import { toShekels, sumLineItems } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';
  import { snackbar } from '$lib/stores/snackbarStore';

  export let invoice: Invoice;
  export let isModalShowing = false;

  let dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close>
  <div class="flex flex-col justify-between items-center gap-6 h-full min-h-[175px]">
    <div class="text-center text-xl mt-7 font-bold text-blue-700">
      Delete invoice to <span class="text-scarlet">{invoice.client.name}</span> for
      <span class="text-scarlet">{toShekels(sumLineItems(invoice.lineItems))}</span>
    </div>
    <div class="flex gap-x-6 ">
      <Button
        label="Cancel"
        onClick={() => dispatch('close')}
        isAnimated={false}
        style="secondary"
      />
      <Button
        label="Delete"
        onClick={() => {
          dispatch('close');
          deleteInvoice(invoice);
          snackbar.send({
            message: 'Invoice was deleted',
            type: 'success'
          });
        }}
        isAnimated={false}
        style="destructive"
      />
    </div>
  </div>
</Modal>
