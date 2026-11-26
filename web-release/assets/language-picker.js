const select = document.getElementById('language');
const trigger = document.getElementById('languagePicker');
const menu = document.getElementById('languageFlags');
const flag = trigger.querySelector('.language-flag');

function render() {
  const selected = select.selectedOptions[0];
  flag.dataset.flag = selected?.value || 'en';
  trigger.disabled = select.disabled || !selected;
  trigger.setAttribute('aria-label', selected ? 'Öyrəndiyim dil · ' + selected.text : 'Öyrəndiyim dil');
  if (trigger.disabled && menu.matches(':popover-open')) menu.hidePopover();
  menu.replaceChildren(...Array.from(select.options, (option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.title = option.text;
    button.setAttribute('aria-label', option.text);
    button.setAttribute('aria-pressed', String(option.selected));
    button.disabled = option.disabled;
    const icon = document.createElement('span');
    icon.className = 'language-flag';
    icon.dataset.flag = option.value;
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon);
    button.addEventListener('click', () => {
      if (select.disabled) return;
      select.value = option.value;
      menu.hidePopover();
      trigger.focus();
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    return button;
  }));
}

new MutationObserver(render).observe(select, { childList: true, attributes: true, subtree: true });
render();
