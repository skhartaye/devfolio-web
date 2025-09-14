'use client';

import { useEffect } from 'react';

export function Security() {
  useEffect(() => {
    // Enhanced right-click context menu blocking
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Enhanced keyboard shortcut blocking with immediate destruction
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey; // Support both Ctrl and Cmd
      const shift = e.shiftKey;
      const alt = e.altKey;

      // Block F12, F1-F12 function keys
      if (key.startsWith('f') && key.length <= 3) {
        e.preventDefault();
        e.stopPropagation();
        destroyEverything();
        return false;
      }
      
      // Block only actual DevTools shortcuts with immediate destruction
      if (
        (ctrl && shift && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) ||
        (alt && shift && key === 'i') ||
        (ctrl && key === 'u') ||
        (key === 'f12')
      ) {
        e.preventDefault();
        e.stopPropagation();
        destroyEverything();
        return false;
      }
      
      // Block other shortcuts but don't destroy everything
      if (
        (ctrl && key === 's') ||
        (ctrl && key === 'a') ||
        (ctrl && key === 'p') ||
        (ctrl && key === 'f') ||
        (ctrl && key === 'g') ||
        (ctrl && key === 'h') ||
        (ctrl && key === 'r') ||
        (ctrl && key === 'f5') ||
        (key === 'f5') ||
        (key === 'f11')
      ) {
        e.preventDefault();
        e.stopPropagation();
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

    // Enhanced console protection with safe override
    const overrideConsole = () => {
      if (typeof window !== 'undefined' && window.console) {
        const noop = () => {};
        
        // Safe console method override - only override if writable
        const safeOverride = (obj: any, method: string, newValue: any) => {
          try {
            const descriptor = Object.getOwnPropertyDescriptor(obj, method);
            if (descriptor && descriptor.writable !== false) {
              obj[method] = newValue;
            }
          } catch (e) {
            // Ignore errors for read-only properties
          }
        };

        // Try to override console methods safely
        safeOverride(window.console, 'log', noop);
        safeOverride(window.console, 'warn', noop);
        safeOverride(window.console, 'error', noop);
        safeOverride(window.console, 'info', noop);
        safeOverride(window.console, 'debug', noop);
        safeOverride(window.console, 'trace', noop);
        safeOverride(window.console, 'table', noop);
        safeOverride(window.console, 'group', noop);
        safeOverride(window.console, 'groupEnd', noop);
        safeOverride(window.console, 'time', noop);
        safeOverride(window.console, 'timeEnd', noop);
        safeOverride(window.console, 'count', noop);
        safeOverride(window.console, 'assert', noop);
        safeOverride(window.console, 'dir', noop);
        safeOverride(window.console, 'dirxml', noop);
        safeOverride(window.console, 'groupCollapsed', noop);
        safeOverride(window.console, 'profile', noop);
        safeOverride(window.console, 'profileEnd', noop);
        safeOverride(window.console, 'timeStamp', noop);
        safeOverride(window.console, 'timeline', noop);
        safeOverride(window.console, 'timelineEnd', noop);
        safeOverride(window.console, 'markTimeline', noop);
        safeOverride(window.console, 'clear', noop);

        // Additional protection: Create a proxy to intercept console calls
        try {
          const consoleProxy = new Proxy(window.console, {
            get(target, prop) {
              if (typeof prop === 'string' && typeof target[prop as keyof Console] === 'function') {
                return noop;
              }
              return target[prop as keyof Console];
            }
          });
          
          // Try to replace the console object
          try {
            Object.defineProperty(window, 'console', {
              value: consoleProxy,
              writable: false,
              configurable: false
            });
          } catch (e) {
            // If we can't replace the console object, that's okay
          }
        } catch (e) {
          // If proxy creation fails, that's okay too
        }
      }
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Complete destruction function
    const destroyEverything = () => {
      if (process.env.NODE_ENV === 'production') {
        // Clear all content immediately
        document.documentElement.innerHTML = '';
        document.body.innerHTML = '';
        
        // Clear all storage
        try {
          localStorage.clear();
          sessionStorage.clear();
          indexedDB.deleteDatabase('devfolio');
        } catch (e) {}
        
        // Clear cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        // Redirect to blank page
        window.location.href = 'about:blank';
        
        // Force close if possible
        window.close();
      }
    };

    // Enhanced anti-debugging: Multiple detection methods with immediate destruction
    const detectDevTools = () => {
      if (process.env.NODE_ENV === 'production') {
        let devtools = false;
        let devtoolsCount = 0;
        
        // Method 1: Window size detection (enhanced for menu access)
        const checkWindowSize = () => {
          const threshold = 150; // Lowered threshold to catch menu-opened DevTools
          const heightDiff = window.outerHeight - window.innerHeight;
          const widthDiff = window.outerWidth - window.innerWidth;
          
          // Check for DevTools opened from menu (usually smaller differences)
          if ((heightDiff > threshold && heightDiff < 800) || 
              (widthDiff > threshold && widthDiff < 800)) {
            devtoolsCount++;
          }
        };
        
        // Method 2: Console detection (enhanced for menu access)
        const checkConsole = () => {
          const start = performance.now();
          console.clear();
          const end = performance.now();
          // Lowered threshold to catch menu-opened DevTools
          if (end - start > 2) {
            devtoolsCount++;
          }
        };
        
        // Method 3: Debugger detection
        const checkDebugger = () => {
          try {
            debugger;
            devtoolsCount++;
          } catch (e) {
            // DevTools not open
          }
        };
        
        // Method 4: Function toString detection
        const checkFunctionToString = () => {
          const func = () => {};
          if (func.toString().length > 100) {
            devtoolsCount++;
          }
        };
        
        // Method 5: Date precision detection (more conservative)
        const checkDatePrecision = () => {
          const start = Date.now();
          const end = Date.now();
          // Increased threshold to reduce false positives
          if (end - start > 3) {
            devtoolsCount++;
          }
        };
        
        // Method 6: Edge-specific detection
        const checkEdgeDevTools = () => {
          // Check for Edge DevTools specific behavior
          if (window.chrome && window.chrome.runtime && window.chrome.runtime.onConnect) {
            devtoolsCount++;
          }
          
          // Check for Edge DevTools extension
          if (window.chrome && window.chrome.devtools) {
            devtoolsCount++;
          }
          
          // Check for Edge-specific DevTools API
          if (window.chrome && window.chrome.devtools && window.chrome.devtools.inspectedWindow) {
            devtoolsCount++;
          }
        };
        
        // Method 7: Additional Edge detection
        const checkEdgeSpecific = () => {
          // Check for Edge DevTools network tab
          if (window.chrome && window.chrome.devtools && window.chrome.devtools.network) {
            devtoolsCount++;
          }
          
          // Check for Edge DevTools panels
          if (window.chrome && window.chrome.devtools && window.chrome.devtools.panels) {
            devtoolsCount++;
          }
        };
        
        // Method 8: Enhanced DevTools detection for menu access
        const checkMenuDevTools = () => {
          // Check for DevTools opened via menu (different behavior)
          if (window.outerHeight !== window.innerHeight || window.outerWidth !== window.innerWidth) {
            // Additional check for DevTools specific window properties
            if (window.screen && window.screen.availHeight) {
              const screenHeight = window.screen.availHeight;
              const windowHeight = window.outerHeight;
              if (windowHeight < screenHeight - 100) {
                devtoolsCount++;
              }
            }
          }
        };
        
        // Method 9: Console method override detection
        const checkConsoleOverride = () => {
          // Check if console methods have been overridden (indicates DevTools)
          const originalLog = console.log.toString();
          if (originalLog.includes('native code') || originalLog.length < 50) {
            // Console methods are native, DevTools might be open
            devtoolsCount++;
          }
        };
        
        // Method 10: Performance timing detection
        const checkPerformanceTiming = () => {
          const start = performance.now();
          // Create a small delay
          for (let i = 0; i < 1000; i++) {
            Math.random();
          }
          const end = performance.now();
          // If DevTools are open, timing might be affected
          if (end - start > 1) {
            devtoolsCount++;
          }
        };
        
        const detectInterval = setInterval(() => {
          devtoolsCount = 0;
          checkWindowSize();
          checkConsole();
          checkDebugger();
          checkFunctionToString();
          checkDatePrecision();
          checkEdgeDevTools();
          checkEdgeSpecific();
          checkMenuDevTools();
          checkConsoleOverride();
          checkPerformanceTiming();
          
          // Require at least 1 detection method to trigger (more sensitive for menu access)
          if (devtoolsCount >= 1 && !devtools) {
            devtools = true;
            // Immediate destruction on any detection
            destroyEverything();
            clearInterval(detectInterval);
          }
        }, 100); // Faster detection for menu-opened DevTools
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
