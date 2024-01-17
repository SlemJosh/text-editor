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
  

  butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    // show the install prompt
    promptEvent.prompt();
    window.deferredPrompt = null;
    // hide the install button
    butInstall.classList.toggle('hidden', true);
  });

  window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;