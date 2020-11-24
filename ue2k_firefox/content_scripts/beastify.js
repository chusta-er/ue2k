// IDEA: parts of this script were wirtten/debugged in test_e2k.html

(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function get_links() {
        regexp = /ed2k\:\/\/\|file\|[^\|]+\|\d+\|[A-Fa-f0-9]{32}\|\//g;
        ed2k_links = [...document.documentElement.innerHTML.matchAll(regexp)]
                        // extract firsts elemets of the association returned by matchAll:
                        .map( function(element){return element[0];} );
        console.log('links:', ed2k_links);
    }
    get_links();
    
    // Create an observer instance linked to the callback function
    observer = new MutationObserver(get_links);

    // Start observing the target node for configured mutations
    observer.observe(document.documentElement, { childList: true, subtree: true });

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
  */

})();
