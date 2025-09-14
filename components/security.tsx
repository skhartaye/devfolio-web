'use client';

import { useEffect } from 'react';

export function Security() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      // Alt+Shift+I (DevTools alternative)
      if (e.altKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+K (Console alternative)
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Clear console periodically
    const clearConsole = () => {
      if (typeof window !== 'undefined' && window.console) {
        console.clear();
        // Additional console clearing
        console.log('%c', 'font-size:1px;');
        console.clear();
      }
    };

    // Override console methods
    const overrideConsole = () => {
      if (typeof window !== 'undefined' && window.console) {
        const noop = () => {};
        const originalConsole = { ...window.console };
        
        // Override all console methods
        Object.keys(window.console).forEach(key => {
          if (typeof window.console[key as keyof Console] === 'function') {
            window.console[key as keyof Console] = noop as any;
          }
        });

        // Override specific methods
        window.console.log = noop;
        window.console.warn = noop;
        window.console.error = noop;
        window.console.info = noop;
        window.console.debug = noop;
        window.console.trace = noop;
        window.console.table = noop;
        window.console.group = noop;
        window.console.groupEnd = noop;
        window.console.time = noop;
        window.console.timeEnd = noop;
        window.console.count = noop;
        window.console.assert = noop;
        window.console.dir = noop;
        window.console.dirxml = noop;
        window.console.groupCollapsed = noop;
        window.console.profile = noop;
        window.console.profileEnd = noop;
        window.console.timeStamp = noop;
        window.console.timeline = noop;
        window.console.timelineEnd = noop;
        window.console.markTimeline = noop;
        window.console.clear = () => {
          // Keep console.clear working but silent
        };
      }
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Anti-debugging: Detect DevTools (only in production)
    const detectDevTools = () => {
      if (process.env.NODE_ENV === 'production') {
        let devtools = false;
        const threshold = 160;
        
        setInterval(() => {
          if (window.outerHeight - window.innerHeight > threshold || 
              window.outerWidth - window.innerWidth > threshold) {
            if (!devtools) {
              devtools = true;
              // Redirect or show warning
              document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial;font-size:24px;color:#333;">Developer Tools Detected</div>';
            }
          } else {
            devtools = false;
          }
        }, 500);
      }
    };

    // Disable print screen
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Override console and clear it
    overrideConsole();
    clearConsole();

    // Start anti-debugging detection
    detectDevTools();

    // Clear console every 50ms for better protection (only in production)
    const interval = process.env.NODE_ENV === 'production' 
      ? setInterval(clearConsole, 50)
      : null;

    // Additional security: Disable common debugging methods (only in production)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Disable eval
      (window as any).eval = () => {
        throw new Error('Eval is disabled');
      };
      
      // Disable Function constructor
      (window as any).Function = () => {
        throw new Error('Function constructor is disabled');  
      };
    }

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return null;
}
