export function accessibility(){

  // 1 - toggle background videos 
  document.querySelectorAll('[toogle_video]').forEach(button => {

    button.setAttribute('aria-label', 'Pause the video');
    button.setAttribute('title', 'Pause the video');

    button.addEventListener('click', () => {
      // Find the nearest ancestor with the 'w-dyn-item' (w-dyn-item is webflow class for collection item)
      const heroOverlay = button.closest('.w-dyn-item');
      if (!heroOverlay) return;

      // Find the video inside that ancestor
      const video = heroOverlay.querySelector('video');
      if (!video) return;

      // Toggle play/pause
      if (video.paused) {
        video.play();
        button.setAttribute('aria-label', 'Pause the video');
        button.setAttribute('title', 'Pause the video');
      } else {
        video.pause();
        button.setAttribute('aria-label', 'Play the video');
        button.setAttribute('title', 'Play the video');
      }
    });
  });


}