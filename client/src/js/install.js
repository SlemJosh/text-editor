const butInstall = document.getElementById('buttonInstall');

// Event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();

    // Stash the event for later use
    window.deferredPrompt = event;

    // Show the install button by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// Click event listener for the install button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return; // Exit if there's no deferred prompt
    }

    // Show the installation prompt to the user
    promptEvent.prompt();

    // Reset the deferred prompt variable as it can only be used once
    window.deferredPrompt = null;

    // Hide the install button after prompt is shown
    butInstall.classList.toggle('hidden', true);
});

// Event listener for appinstalled event
window.addEventListener('appinstalled', (event) => {
    // Reset the deferred prompt variable as the app is installed
    window.deferredPrompt = null;
});
