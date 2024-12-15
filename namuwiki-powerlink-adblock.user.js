// ==UserScript==
// @name         Remove powerlink advertise
// @namespace    http://tampermonkey.net/
// @version      202412151707
// @description  Remove powerlink advertise
// @author       hotswap
// @match        https://namu.wiki/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=namu.wiki
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const hideAdvertise = () => {
        requestAnimationFrame(() => {
            const AD_LABEL_IMAGE = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAQCAYAAADqDXTRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtGVYSWZJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAEwIDAAEAAAABAAAAaYcEAAEAAABmAAAAAAAAAEgAAAABAAAASAAAAAEAAAAGAACQBwAEAAAAMDIxMAGRBwAEAAAAAQIDAACgBwAEAAAAMDEwMAGgAwABAAAA//8AAAKgBAABAAAAHQAAAAOgBAABAAAAEAAAAAAAAABYWHqhAAABtklEQVR4nGOwrdH4T2/MMOgtDeqy/+/VakZ9Sz1bTP9vPL0SA7s2Gf6/+vji/3l7J8PVRvS5/U+ZFowVh/Y4E2+pe7Px/xk7e+B49bFF/0HAA+gYdEtXHV34/8bTKxj449f3/7edW0d68ObMifkfN8nnf/GClP9//v7571CnDbb04oMz/ydubcUbfHsubf2/6fQq0i09dfvI/wX7p4Et33F+I1gMZOnpO0f/t62txGvpoWt7/q85vph4S6uX5YKD9fGbB2BfrT62EGzplO0dGMELw+kzwsDqYXyQulm7+4m3tHl12f8lh2aD8dy9k/53rKv+X7oo7X94rytOS/PmxoGjAMZ//+Xt/8ZVJaQHb8bMCHCqPXfvJNjHuy5sAjvIuUEfr6V2tZr/Z+7qA6dskixNmhr4/9fvn8Ag7QQaGP8/a1bU/64Ntf8/fvsAthjiqPD/dSsKwHjevin//wIthfFhOHlaEPGW5s6JBVtatjj9v3+HzX/vVnOwxa8+Poen3Mnb2v/vu7wdL+5cX0Na8LauKf9/+eG5/28/v/7/4eu7/7eeXQcHmz0w6+BLucTgwV/2DmlLAavj9Hvj7rWGAAAAAElFTkSuQmCC")';
    
            const adLabels = [
                ...[...document.querySelectorAll('span')].filter(el => window.getComputedStyle(el).backgroundImage === AD_LABEL_IMAGE),
                ...document.querySelectorAll('img[src*="//i.namu.wiki/i/0XdKxuKE15s2nBXA5ONLGz5Im1evTbKAEp0l7qJ84bI.png"], img[src*="//i.namu.wiki/i/0XdKxuKE15s2nBXA5ONLG66Mwng080K-LocLtYyl2nU.png"]'),
            ];
    
            for (const adLabel of adLabels) {
                let parentDiv = adLabel.closest('div');
                while (parentDiv) {
                    const divStyle = window.getComputedStyle(parentDiv);
                    if (divStyle.borderRadius === '6px') {
                        parentDiv.style.display = 'none';
                        // Remove to get rid of leftovers
                        parentDiv.parentElement.remove();
                        break;
                    }
                    parentDiv = parentDiv.parentElement?.closest('div');
                }
            }
        });
    };

    const observer = new MutationObserver(hideAdvertise);
    observer.observe(document.body, { childList: true, subtree: true, attributeFilter: ['src'] });
    
    window.onload = hideAdvertise;
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", hideAdvertise);
    } else {
        hideAdvertise();
    }
})();
