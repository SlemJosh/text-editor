const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    // prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // stash the event so it can be triggered later
    window.deferredPrompt = event;
    // remove the 'hidden' class from the install button container
    butInstall.classList.toggle('hidden', false);
  });
  

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
