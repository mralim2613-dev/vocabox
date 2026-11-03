// In-page confirmation also works inside native/webview browser shells.
export function confirmAction(message) {
  return new Promise(resolve => {
    const dialog=document.createElement('dialog');
    dialog.setAttribute('aria-label','Əməliyyatı təsdiqlə');
    const text=document.createElement('p');text.textContent=message;text.style.whiteSpace='pre-line';
    const actions=document.createElement('div');actions.className='row section-space';
    const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Ləğv et';
    const confirm=document.createElement('button');confirm.type='button';confirm.className='primary';confirm.textContent='Təsdiqlə';
    cancel.onclick=()=>dialog.close('cancel');confirm.onclick=()=>dialog.close('confirm');
    actions.append(cancel,confirm);dialog.append(text,actions);document.body.append(dialog);
    dialog.addEventListener('close',()=>{const accepted=dialog.returnValue==='confirm';dialog.remove();resolve(accepted)},{once:true});
    dialog.showModal();cancel.focus();
  });
}
