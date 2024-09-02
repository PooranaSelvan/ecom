export function onModeButtonClick() {
    const radioButtons = document.getElementById('theme');
  
    radioButtons.addEventListener("click", () => {
      // Get the current mode from localStorage
      const isDarkMode = localStorage.getItem('theme') === 'Dark';
  
      // Toggle mode
      if (isDarkMode) {
        // Switch to light mode
        localStorage.removeItem('theme');
      } else {
        // Switch to dark mode
        localStorage.setItem('theme', 'Dark');
      }
  
      // Apply the mode
      setMode();
    });
  
    // Apply the mode on page load based on localStorage value
    setMode();
  }
  
  function setMode() {
    const mode = localStorage.getItem('theme');
    if (mode === 'Dark') {
      // Apply dark mode
      document.documentElement.classList.add('dark');
    } else {
      // Apply light mode
      document.documentElement.classList.remove('dark');
    }
  }
  