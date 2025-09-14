'use client';

import { useEffect } from 'react';

export function Security() {
  useEffect(() => {
    // Enhanced right-click context menu blocking with immediate action
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Immediately hide content when right-click is attempted
      if (process.env.NODE_ENV === 'production') {
        hideAllElements();
      }
      
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

    // Hide all elements function with zoom prevention
    const hideAllElements = () => {
      if (process.env.NODE_ENV === 'production') {
        // Disable zooming immediately
        document.body.style.zoom = '1';
        document.documentElement.style.zoom = '1';
        
        // Add a message overlay
        const overlay = document.createElement('div');
        overlay.id = 'devtools-overlay';
        overlay.innerHTML = `
          <div style="
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
            cursor: none;
            zoom: 1 !important;
            transform: scale(1) !important;
          ">
            <div>
              <h1>Access Restricted</h1>
              <p>Developer tools detected. Please close them to continue.</p>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);
        
        // Disable all zoom methods
        const disableZoom = () => {
          document.body.style.zoom = '1';
          document.documentElement.style.zoom = '1';
          document.body.style.transform = 'scale(1)';
          document.documentElement.style.transform = 'scale(1)';
        };
        
        // Continuously disable zoom
        const zoomInterval = setInterval(disableZoom, 10);
        
        // Start monitoring for DevTools closure
        const checkDevToolsClosed = setInterval(() => {
          const heightDiff = window.outerHeight - window.innerHeight;
          const widthDiff = window.outerWidth - window.innerWidth;
          
          // If DevTools are closed (small differences), show content again
          if (heightDiff < 100 && widthDiff < 100) {
            const overlay = document.getElementById('devtools-overlay');
            if (overlay) {
              overlay.remove();
            }
            clearInterval(checkDevToolsClosed);
            clearInterval(zoomInterval);
          }
        }, 500);
      }
    };

    // Complete destruction function (for keyboard shortcuts)
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
        let lastWindowSize = { width: window.innerWidth, height: window.innerHeight };
        
        // Method 0: Ultra-aggressive detection - check every possible indicator
        const ultraAggressiveCheck = () => {
          // Check window dimensions - ANY difference triggers
          const heightDiff = window.outerHeight - window.innerHeight;
          const widthDiff = window.outerWidth - window.innerWidth;
          
          // Trigger on ANY difference (very aggressive)
          if (heightDiff > 0 || widthDiff > 0) {
            hideAllElements();
            return true;
          }
          
          // Check console timing with very sensitive threshold
          const start = performance.now();
          console.clear();
          const end = performance.now();
          if (end - start > 0) {
            hideAllElements();
            return true;
          }
          
          // Check if DevTools APIs are available
          if (window.chrome && window.chrome.devtools) {
            hideAllElements();
            return true;
          }
          
          return false;
        };
        
        // Method 1: Window size detection (very sensitive for menu DevTools)
        const checkWindowSize = () => {
          const threshold = 100; // Much lower threshold to catch menu-opened DevTools
          const heightDiff = window.outerHeight - window.innerHeight;
          const widthDiff = window.outerWidth - window.innerWidth;
          
          // Check for DevTools opened from menu (even smaller differences)
          if ((heightDiff > threshold && heightDiff < 1000) || 
              (widthDiff > threshold && widthDiff < 1000)) {
            devtoolsCount++;
          }
        };
        
        // Method 2: Console detection (very sensitive for menu DevTools)
        const checkConsole = () => {
          const start = performance.now();
          console.clear();
          const end = performance.now();
          // Much lower threshold to catch menu-opened DevTools
          if (end - start > 1) {
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
        
        // Method 8: Enhanced DevTools detection for menu access (very conservative)
        const checkMenuDevTools = () => {
          // Check for DevTools opened via menu (different behavior)
          if (window.outerHeight !== window.innerHeight || window.outerWidth !== window.innerWidth) {
            // Additional check for DevTools specific window properties
            if (window.screen && window.screen.availHeight) {
              const screenHeight = window.screen.availHeight;
              const windowHeight = window.outerHeight;
              // Much more conservative - only trigger on very significant differences
              if (windowHeight < screenHeight - 300) {
                devtoolsCount++;
              }
            }
          }
        };
        
        // Method 9: Console method override detection (disabled - too unreliable)
        const checkConsoleOverride = () => {
          // Disabled this method as it causes too many false positives
          // const originalLog = console.log.toString();
          // if (originalLog.includes('native code') || originalLog.length < 50) {
          //   devtoolsCount++;
          // }
        };
        
        // Method 10: Performance timing detection (disabled - too unreliable)
        const checkPerformanceTiming = () => {
          // Disabled this method as it causes too many false positives
          // const start = performance.now();
          // for (let i = 0; i < 1000; i++) {
          //   Math.random();
          // }
          // const end = performance.now();
          // if (end - start > 1) {
          //   devtoolsCount++;
          // }
        };
        
        // Method 11: Menu DevTools specific detection
        const checkMenuDevToolsSpecific = () => {
          // Check for DevTools opened via menu by monitoring window properties
          if (window.outerHeight !== window.innerHeight || window.outerWidth !== window.innerWidth) {
            // Check if the difference is consistent with DevTools
            const heightDiff = window.outerHeight - window.innerHeight;
            const widthDiff = window.outerWidth - window.innerWidth;
            
            // Menu-opened DevTools typically have smaller but consistent differences
            if ((heightDiff > 100 && heightDiff < 400) || (widthDiff > 100 && widthDiff < 400)) {
              devtoolsCount++;
            }
          }
        };
        
        // Method 12: DevTools API detection
        const checkDevToolsAPI = () => {
          // Check for DevTools specific APIs that become available
          if (window.chrome && window.chrome.devtools) {
            devtoolsCount++;
          }
          
          // Check for DevTools extension APIs
          if (window.chrome && window.chrome.runtime && window.chrome.runtime.onConnect) {
            devtoolsCount++;
          }
        };
        
        // Method 13: Console method detection
        const checkConsoleMethods = () => {
          // Check if console methods behave differently when DevTools are open
          const originalLog = console.log.toString();
          const originalError = console.error.toString();
          
          // When DevTools are open, these methods might have different string representations
          if (originalLog.includes('native code') || originalError.includes('native code')) {
            devtoolsCount++;
          }
        };
        
        // Method 14: Window focus detection
        const checkWindowFocus = () => {
          // DevTools can affect window focus behavior
          if (document.hidden === false && window.outerHeight !== window.innerHeight) {
            devtoolsCount++;
          }
        };
        
        // Method 15: Aggressive menu DevTools detection
        const checkAggressiveMenuDevTools = () => {
          // Check for any window size difference (very aggressive)
          if (window.outerHeight !== window.innerHeight || window.outerWidth !== window.innerWidth) {
            const heightDiff = window.outerHeight - window.innerHeight;
            const widthDiff = window.outerWidth - window.innerWidth;
            
            // Even the smallest differences could indicate DevTools
            if (heightDiff > 50 || widthDiff > 50) {
              devtoolsCount++;
            }
          }
        };
        
        // Method 16: Console performance detection
        const checkConsolePerformance = () => {
          // More aggressive console timing check
          const start = performance.now();
          console.log('test');
          console.clear();
          const end = performance.now();
          
          // Very sensitive timing detection
          if (end - start > 0.5) {
            devtoolsCount++;
          }
        };
        
        // Method 17: Window resize detection
        const checkWindowResize = () => {
          // Check if window has been resized (common when DevTools open)
          if (window.outerHeight !== window.innerHeight || window.outerWidth !== window.innerWidth) {
            // Check for typical DevTools sizes
            const heightDiff = window.outerHeight - window.innerHeight;
            const widthDiff = window.outerWidth - window.innerWidth;
            
            // Menu-opened DevTools often have specific size patterns
            if ((heightDiff > 80 && heightDiff < 500) || (widthDiff > 80 && widthDiff < 500)) {
              devtoolsCount++;
            }
          }
        };
        
        // Add window resize listener for immediate detection
        const handleWindowResize = () => {
          const currentSize = { width: window.innerWidth, height: window.innerHeight };
          const outerSize = { width: window.outerWidth, height: window.outerHeight };
          
          // Check if window size changed significantly (DevTools opened)
          if (outerSize.width !== currentSize.width || outerSize.height !== currentSize.height) {
            const widthDiff = outerSize.width - currentSize.width;
            const heightDiff = outerSize.height - currentSize.height;
            
            // If there's any significant difference, DevTools might be open
            if (widthDiff > 50 || heightDiff > 50) {
              hideAllElements();
            }
          }
        };

        // Add resize event listener
        window.addEventListener('resize', handleWindowResize);

        // Additional aggressive detection using console monitoring
        const monitorConsole = () => {
          let consoleOpen = false;
          const checkConsoleOpen = () => {
            const start = Date.now();
            console.clear();
            const end = Date.now();
            
            // If console.clear takes time, DevTools are likely open
            if (end - start > 0) {
              if (!consoleOpen) {
                consoleOpen = true;
                hideAllElements();
              }
            } else {
              consoleOpen = false;
            }
          };
          
          // Check console every 50ms
          setInterval(checkConsoleOpen, 50);
        };

        monitorConsole();

        // Ultra-aggressive detection interval
        const detectInterval = setInterval(() => {
          if (ultraAggressiveCheck()) {
            clearInterval(detectInterval);
          }
        }, 25); // Very fast detection - check every 25ms

        // Additional method: Use MutationObserver to detect DOM changes
        const observer = new MutationObserver(() => {
          // If DOM is being modified and window size changed, DevTools might be open
          const heightDiff = window.outerHeight - window.innerHeight;
          const widthDiff = window.outerWidth - window.innerWidth;
          
          if (heightDiff > 20 || widthDiff > 20) {
            hideAllElements();
          }
        });

        // Start observing
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true
        });
      }
    };

    // Disable print screen
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
    };

    // Disable zooming through keyboard shortcuts
    const handleZoomPrevention = (e: KeyboardEvent) => {
      // Prevent Ctrl + Plus/Minus/0 (zoom in/out/reset)
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0' || e.key === '=')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent Ctrl + Mouse wheel zoom
      if (e.ctrlKey && (e.key === 'WheelUp' || e.key === 'WheelDown')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable mouse wheel zoom
    const handleWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable touch zoom
    const handleTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add comprehensive event listeners to prevent DevTools access
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    
    // Add zoom prevention event listeners
    document.addEventListener('keydown', handleZoomPrevention);
    document.addEventListener('wheel', handleWheelZoom, { passive: false });
    document.addEventListener('touchstart', handleTouchZoom, { passive: false });
    document.addEventListener('touchmove', handleTouchZoom, { passive: false });

    // Additional comprehensive prevention
    window.addEventListener('contextmenu', handleContextMenu);
    document.body.addEventListener('contextmenu', handleContextMenu);
    
    // Prevent F12 and other DevTools shortcuts more aggressively
    document.addEventListener('keydown', (e) => {
      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        if (process.env.NODE_ENV === 'production') {
          hideAllElements();
        }
        return false;
      }
      
      // Ctrl+Shift+I (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        e.stopPropagation();
        if (process.env.NODE_ENV === 'production') {
          hideAllElements();
        }
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        e.stopPropagation();
        if (process.env.NODE_ENV === 'production') {
          hideAllElements();
        }
        return false;
      }
      
      // Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        e.stopPropagation();
        if (process.env.NODE_ENV === 'production') {
          hideAllElements();
        }
        return false;
      }
    });

    // Override console and clear it
    overrideConsole();
    clearConsole();

    // Start anti-debugging detection
    detectDevTools();

    // Clear console every 50ms for better protection (only in production)
    const interval = process.env.NODE_ENV === 'production' 
      ? setInterval(clearConsole, 50)
      : null;

    // Continuously reset zoom (only in production)
    const zoomResetInterval = process.env.NODE_ENV === 'production' 
      ? setInterval(() => {
          document.body.style.zoom = '1';
          document.documentElement.style.zoom = '1';
          document.body.style.transform = 'scale(1)';
          document.documentElement.style.transform = 'scale(1)';
          
          // Reset viewport meta tag if it exists
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          }
        }, 100)
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
