'use client';

import { useEffect } from 'react';

export function Security() {
  useEffect(() => {
    // Enhanced right-click context menu blocking with destruction
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      destroyEverything();
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
      
      // Block all DevTools shortcuts with immediate destruction
      if (
        (ctrl && shift && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) ||
        (alt && shift && key === 'i') ||
        (ctrl && key === 'u') ||
        (ctrl && key === 's') ||
        (ctrl && key === 'a') ||
        (ctrl && key === 'p') ||
        (ctrl && key === 'f') ||
        (ctrl && key === 'g') ||
        (ctrl && key === 'h') ||
        (ctrl && key === 'r') ||
        (ctrl && key === 'f5') ||
        (key === 'f5') ||
        (key === 'f11') ||
        (key === 'f12')
      ) {
        e.preventDefault();
        e.stopPropagation();
        destroyEverything();
        return false;
      }
    };

    // Disable text selection with destruction
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      destroyEverything();
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

    // Enhanced console protection
    const overrideConsole = () => {
      if (typeof window !== 'undefined' && window.console) {
        const noop = () => {};
        const originalConsole = { ...window.console };
        
        // Override all console methods with enhanced protection
        Object.keys(window.console).forEach(key => {
          if (typeof window.console[key as keyof Console] === 'function') {
            window.console[key as keyof Console] = noop as any;
          }
        });

        // Override specific methods with additional protection
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

        // Additional protection: Override console object itself
        Object.defineProperty(window, 'console', {
          get: () => ({
            log: noop,
            warn: noop,
            error: noop,
            info: noop,
            debug: noop,
            trace: noop,
            table: noop,
            group: noop,
            groupEnd: noop,
            time: noop,
            timeEnd: noop,
            count: noop,
            assert: noop,
            dir: noop,
            dirxml: noop,
            groupCollapsed: noop,
            profile: noop,
            profileEnd: noop,
            timeStamp: noop,
            timeline: noop,
            timelineEnd: noop,
            markTimeline: noop,
            clear: noop
          }),
          set: () => {},
          configurable: false
        });
      }
    };

    // Disable drag and drop with destruction
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      destroyEverything();
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
        
        // Method 1: Window size detection
        const checkWindowSize = () => {
          const threshold = 160;
          if (window.outerHeight - window.innerHeight > threshold || 
              window.outerWidth - window.innerWidth > threshold) {
            devtoolsCount++;
          }
        };
        
        // Method 2: Console detection
        const checkConsole = () => {
          const start = performance.now();
          console.clear();
          const end = performance.now();
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
        
        // Method 5: Date precision detection
        const checkDatePrecision = () => {
          const start = Date.now();
          const end = Date.now();
          if (end - start > 1) {
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
        
        const detectInterval = setInterval(() => {
          devtoolsCount = 0;
          checkWindowSize();
          checkConsole();
          checkDebugger();
          checkFunctionToString();
          checkDatePrecision();
          checkEdgeDevTools();
          checkEdgeSpecific();
          
          if (devtoolsCount >= 1 && !devtools) {
            devtools = true;
            // Immediate destruction on any detection
            destroyEverything();
            clearInterval(detectInterval);
          }
        }, 50); // Even faster detection
      }
    };

    // Disable print screen with destruction
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        destroyEverything();
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
