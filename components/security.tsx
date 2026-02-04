'use client';

import { useEffect } from 'react';

export function Security() {
  useEffect(() => {
    // Only enable security features in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      // Block F12 and all function keys
      if (key.startsWith('f') && key.length <= 3) {
        e.preventDefault();
        return false;
      }

      // Block DevTools shortcuts
      if (
        (ctrl && shift && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) ||
        (ctrl && key === 'u') ||
        (ctrl && shift && key === 'm')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Detect DevTools opening and hide content
    const detectDevTools = () => {
      const threshold = 160;
      let devtoolsOpen = false;

      const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) && 
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || 
             widthThreshold || heightThreshold)) {
          if (!devtoolsOpen) {
            devtoolsOpen = true;
            hideContent();
          }
        } else {
          if (devtoolsOpen) {
            devtoolsOpen = false;
            showContent();
          }
        }
      };

      // Check every 500ms
      setInterval(checkDevTools, 500);

      // Also check on resize
      window.addEventListener('resize', checkDevTools);
    };

    // Hide content when DevTools detected
    const hideContent = () => {
      const overlay = document.createElement('div');
      overlay.id = 'devtools-warning';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
        font-size: 24px;
        text-align: center;
        z-index: 999999;
        flex-direction: column;
        gap: 20px;
      `;
      overlay.innerHTML = `
        <div>
          <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️</h1>
          <h2>Developer Tools Detected</h2>
          <p style="font-size: 18px; color: #999; max-width: 500px; margin-top: 10px;">
            Please close the developer tools to continue viewing this site.
          </p>
        </div>
      `;
      
      if (!document.getElementById('devtools-warning')) {
        document.body.appendChild(overlay);
      }
    };

    // Show content when DevTools closed
    const showContent = () => {
      const overlay = document.getElementById('devtools-warning');
      if (overlay) {
        overlay.remove();
      }
    };

    // Detect console.log timing (DevTools detection)
    const consoleDetection = () => {
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: function() {
          hideContent();
          throw new Error('DevTools detected');
        }
      });
      console.log(element);
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);

    // Start DevTools detection
    detectDevTools();

    // Try console detection (may not work in all browsers)
    try {
      consoleDetection();
    } catch (e) {
      // Ignore errors
    }

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  return null;
}
