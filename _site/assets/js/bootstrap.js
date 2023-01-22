var bootstrap = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getDefaultExportFromNamespaceIfPresent (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
	}

	function getDefaultExportFromNamespaceIfNotNamed (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var modalExports = {};
	var modal = {
	  get exports(){ return modalExports; },
	  set exports(v){ modalExports = v; },
	};

	var utilExports = {};
	var util = {
	  get exports(){ return utilExports; },
	  set exports(v){ utilExports = v; },
	};

	/*!
	  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return utilExports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? factory(exports) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['exports'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Index = {}));
			})(commonjsGlobal, (function (exports) { 'use strict';

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }

			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };
			  /**
			   * Public Util API
			   */


			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));

			    return prefix;
			  };

			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');

			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273

			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      } // Just in case some CMS puts out a full URL with the anchor appended


			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }

			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }

			    return selector;
			  };

			  const getSelectorFromElement = element => {
			    const selector = getSelector(element);

			    if (selector) {
			      return document.querySelector(selector) ? selector : null;
			    }

			    return null;
			  };

			  const getElementFromSelector = element => {
			    const selector = getSelector(element);
			    return selector ? document.querySelector(selector) : null;
			  };

			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    } // Get transition-duration of the element


			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    } // If multiple durations are defined, take the first


			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };

			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };

			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }

			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }

			    return typeof object.nodeType !== 'undefined';
			  };

			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }

			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(object);
			    }

			    return null;
			  };

			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }

			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

			    const closedDetails = element.closest('details:not([open])');

			    if (!closedDetails) {
			      return elementIsVisible;
			    }

			    if (closedDetails !== element) {
			      const summary = element.closest('summary');

			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }

			      if (summary === null) {
			        return false;
			      }
			    }

			    return elementIsVisible;
			  };

			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }

			    if (element.classList.contains('disabled')) {
			      return true;
			    }

			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }

			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };

			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    } // Can find the shadow root otherwise it'll return the document


			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }

			    if (element instanceof ShadowRoot) {
			      return element;
			    } // when we don't find a shadow root


			    if (!element.parentNode) {
			      return null;
			    }

			    return findShadowRoot(element.parentNode);
			  };

			  const noop = () => {};
			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */


			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };

			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }

			    return null;
			  };

			  const DOMContentLoadedCallbacks = [];

			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }

			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };

			  const isRTL = () => document.documentElement.dir === 'rtl';

			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */

			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;

			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };

			  const execute = callback => {
			    if (typeof callback === 'function') {
			      callback();
			    }
			  };

			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }

			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;

			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }

			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };

			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };
			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */


			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed

			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }

			    index += shouldGetNext ? 1 : -1;

			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }

			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };

			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getElementFromSelector = getElementFromSelector;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getSelectorFromElement = getSelectorFromElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;

			  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

			}));
			
	} (util, utilExports));
		return utilExports;
	}

	var eventHandlerExports = {};
	var eventHandler = {
	  get exports(){ return eventHandlerExports; },
	  set exports(v){ eventHandlerExports = v; },
	};

	/*!
	  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandlerExports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireUtil()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['../util/index'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EventHandler = factory(global.Index));
			})(commonjsGlobal, (function (index) { 'use strict';

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage

			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }

			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }

			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });

			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }

			      return fn.apply(element, [event]);
			    };
			  }

			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);

			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }

			          hydrateObj(event, {
			            delegateTarget: target
			          });

			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }

			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }

			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }

			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);

			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }

			    return [isDelegated, callable, typeEvent];
			  }

			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }

			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };

			      callable = wrapFunction(callable);
			    }

			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }

			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }

			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);

			    if (!fn) {
			      return;
			    }

			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }

			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};

			    for (const handlerKey of Object.keys(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        const event = storeElementEvent[handlerKey];
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }

			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }

			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },

			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },

			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }

			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');

			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }

			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }

			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }

			      for (const keyHandlers of Object.keys(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');

			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          const event = storeElementEvent[keyHandlers];
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },

			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }

			      const $ = index.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;

			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }

			      let evt = new Event(event, {
			        bubbles,
			        cancelable: true
			      });
			      evt = hydrateObj(evt, args);

			      if (defaultPrevented) {
			        evt.preventDefault();
			      }

			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }

			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }

			      return evt;
			    }

			  };

			  function hydrateObj(obj, meta) {
			    for (const [key, value] of Object.entries(meta || {})) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,

			          get() {
			            return value;
			          }

			        });
			      }
			    }

			    return obj;
			  }

			  return EventHandler;

			}));
			
	} (eventHandler, eventHandlerExports));
		return eventHandlerExports;
	}

	var selectorEngineExports = {};
	var selectorEngine = {
	  get exports(){ return selectorEngineExports; },
	  set exports(v){ selectorEngineExports = v; },
	};

	/*!
	  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngineExports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireUtil()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['../util/index'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SelectorEngine = factory(global.Index));
			})(commonjsGlobal, (function (index) { 'use strict';

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },

			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },

			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },

			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);

			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }

			      return parents;
			    },

			    prev(element, selector) {
			      let previous = element.previousElementSibling;

			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }

			        previous = previous.previousElementSibling;
			      }

			      return [];
			    },

			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;

			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }

			        next = next.nextElementSibling;
			      }

			      return [];
			    },

			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
			    }

			  };

			  return SelectorEngine;

			}));
			
	} (selectorEngine, selectorEngineExports));
		return selectorEngineExports;
	}

	var scrollbarExports = {};
	var scrollbar = {
	  get exports(){ return scrollbarExports; },
	  set exports(v){ scrollbarExports = v; },
	};

	var manipulatorExports = {};
	var manipulator = {
	  get exports(){ return manipulatorExports; },
	  set exports(v){ manipulatorExports = v; },
	};

	/*!
	  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulatorExports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
			  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Manipulator = factory());
			})(commonjsGlobal, (function () { 'use strict';

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }

			    if (value === 'false') {
			      return false;
			    }

			    if (value === Number(value).toString()) {
			      return Number(value);
			    }

			    if (value === '' || value === 'null') {
			      return null;
			    }

			    if (typeof value !== 'string') {
			      return value;
			    }

			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }

			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }

			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },

			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },

			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }

			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }

			      return attributes;
			    },

			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }

			  };

			  return Manipulator;

			}));
			
	} (manipulator, manipulatorExports));
		return manipulatorExports;
	}

	/*!
	  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbarExports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['../dom/selector-engine', '../dom/manipulator', './index'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Scrollbar = factory(global.SelectorEngine, global.Manipulator, global.Index));
			})(commonjsGlobal, (function (SelectorEngine, Manipulator, index) { 'use strict';

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';
			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    } // Public


			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }

			    hide() {
			      const width = this.getWidth();

			      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }

			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');

			      this._resetElementAttributes(this._element, PROPERTY_PADDING);

			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }

			    isOverflowing() {
			      return this.getWidth() > 0;
			    } // Private


			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');

			      this._element.style.overflow = 'hidden';
			    }

			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();

			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }

			        this._saveInitialAttribute(element, styleProperty);

			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };

			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }

			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);

			      if (actualValue) {
			        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }

			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }

			        Manipulator__default.default.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };

			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }

			    _applyManipulationCallback(selector, callBack) {
			      if (index.isElement(selector)) {
			        callBack(selector);
			        return;
			      }

			      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }

			  }

			  return ScrollBarHelper;

			}));
			
	} (scrollbar, scrollbarExports));
		return scrollbarExports;
	}

	var baseComponentExports = {};
	var baseComponent = {
	  get exports(){ return baseComponentExports; },
	  set exports(v){ baseComponentExports = v; },
	};

	var dataExports = {};
	var data = {
	  get exports(){ return dataExports; },
	  set exports(v){ dataExports = v; },
	};

	/*!
	  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return dataExports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
			  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Data = factory());
			})(commonjsGlobal, (function () { 'use strict';

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }

			      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used

			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }

			      instanceMap.set(key, instance);
			    },

			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }

			      return null;
			    },

			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }

			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key); // free up element references if there are no instances left for an element

			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }

			  };

			  return data;

			}));
			
	} (data, dataExports));
		return dataExports;
	}

	var configExports = {};
	var config = {
	  get exports(){ return configExports; },
	  set exports(v){ configExports = v; },
	};

	/*!
	  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return configExports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireUtil(), requireManipulator()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['./index', '../dom/manipulator'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Config = factory(global.Index, global.Manipulator));
			})(commonjsGlobal, (function (index, Manipulator) { 'use strict';

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Class definition
			   */

			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }

			    static get DefaultType() {
			      return {};
			    }

			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }

			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);

			      this._typeCheckConfig(config);

			      return config;
			    }

			    _configAfterMerge(config) {
			      return config;
			    }

			    _mergeConfigObj(config, element) {
			      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

			      return { ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }

			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const property of Object.keys(configTypes)) {
			        const expectedTypes = configTypes[property];
			        const value = config[property];
			        const valueType = index.isElement(value) ? 'element' : index.toType(value);

			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }

			  }

			  return Config;

			}));
			
	} (config, configExports));
		return configExports;
	}

	/*!
	  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponentExports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['./dom/data', './util/index', './dom/event-handler', './util/config'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BaseComponent = factory(global.Data, global.Index, global.EventHandler, global.Config));
			})(commonjsGlobal, (function (Data, index, EventHandler, Config) { 'use strict';

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

			  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const VERSION = '5.2.3';
			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config__default.default {
			    constructor(element, config) {
			      super();
			      element = index.getElement(element);

			      if (!element) {
			        return;
			      }

			      this._element = element;
			      this._config = this._getConfig(config);
			      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
			    } // Public


			    dispose() {
			      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);

			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }

			    _queueCallback(callback, element, isAnimated = true) {
			      index.executeAfterTransition(callback, element, isAnimated);
			    }

			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);

			      this._typeCheckConfig(config);

			      return config;
			    } // Static


			    static getInstance(element) {
			      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
			    }

			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }

			    static get VERSION() {
			      return VERSION;
			    }

			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }

			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }

			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }

			  }

			  return BaseComponent;

			}));
			
	} (baseComponent, baseComponentExports));
		return baseComponentExports;
	}

	var backdropExports = {};
	var backdrop = {
	  get exports(){ return backdropExports; },
	  set exports(v){ backdropExports = v; },
	};

	/*!
	  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdropExports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['../dom/event-handler', './index', './config'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Backdrop = factory(global.EventHandler, global.Index, global.Config));
			})(commonjsGlobal, (function (EventHandler, index, Config) { 'use strict';

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements

			  };
			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };
			  /**
			   * Class definition
			   */

			  class Backdrop extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    } // Getters


			    static get Default() {
			      return Default;
			    }

			    static get DefaultType() {
			      return DefaultType;
			    }

			    static get NAME() {
			      return NAME;
			    } // Public


			    show(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }

			      this._append();

			      const element = this._getElement();

			      if (this._config.isAnimated) {
			        index.reflow(element);
			      }

			      element.classList.add(CLASS_NAME_SHOW);

			      this._emulateAnimation(() => {
			        index.execute(callback);
			      });
			    }

			    hide(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }

			      this._getElement().classList.remove(CLASS_NAME_SHOW);

			      this._emulateAnimation(() => {
			        this.dispose();
			        index.execute(callback);
			      });
			    }

			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }

			      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

			      this._element.remove();

			      this._isAppended = false;
			    } // Private


			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;

			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }

			        this._element = backdrop;
			      }

			      return this._element;
			    }

			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index.getElement(config.rootElement);
			      return config;
			    }

			    _append() {
			      if (this._isAppended) {
			        return;
			      }

			      const element = this._getElement();

			      this._config.rootElement.append(element);

			      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
			        index.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }

			    _emulateAnimation(callback) {
			      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }

			  }

			  return Backdrop;

			}));
			
	} (backdrop, backdropExports));
		return backdropExports;
	}

	var focustrapExports = {};
	var focustrap = {
	  get exports(){ return focustrapExports; },
	  set exports(v){ focustrapExports = v; },
	};

	/*!
	  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrapExports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['../dom/event-handler', '../dom/selector-engine', './config'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Focustrap = factory(global.EventHandler, global.SelectorEngine, global.Config));
			})(commonjsGlobal, (function (EventHandler, SelectorEngine, Config) { 'use strict';

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of

			  };
			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };
			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    } // Getters


			    static get Default() {
			      return Default;
			    }

			    static get DefaultType() {
			      return DefaultType;
			    }

			    static get NAME() {
			      return NAME;
			    } // Public


			    activate() {
			      if (this._isActive) {
			        return;
			      }

			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }

			      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

			      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }

			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }

			      this._isActive = false;
			      EventHandler__default.default.off(document, EVENT_KEY);
			    } // Private


			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;

			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }

			      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }

			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }

			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }

			  }

			  return FocusTrap;

			}));
			
	} (focustrap, focustrapExports));
		return focustrapExports;
	}

	var componentFunctionsExports = {};
	var componentFunctions = {
	  get exports(){ return componentFunctionsExports; },
	  set exports(v){ componentFunctionsExports = v; },
	};

	/*!
	  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctionsExports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  'object' === 'object' && 'object' !== 'undefined' ? factory(exports, requireEventHandler(), requireUtil()) :
			  typeof undefined === 'function' && undefined.amd ? undefined(['exports', '../dom/event-handler', './index'], factory) :
			  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ComponentFunctions = {}, global.EventHandler, global.Index));
			})(commonjsGlobal, (function (exports, EventHandler, index) { 'use strict';

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }

			      if (index.isDisabled(this)) {
			        return;
			      }

			      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

			      instance[method]();
			    });
			  };

			  exports.enableDismissTrigger = enableDismissTrigger;

			  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

			}));
			
	} (componentFunctions, componentFunctionsExports));
		return componentFunctionsExports;
	}

	/*!
	  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) :
		  typeof undefined === 'function' && undefined.amd ? undefined(['./util/index', './dom/event-handler', './dom/selector-engine', './util/scrollbar', './base-component', './util/backdrop', './util/focustrap', './util/component-functions'], factory) :
		  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Modal = factory(global.Index, global.EventHandler, global.SelectorEngine, global.Scrollbar, global.BaseComponent, global.Backdrop, global.Focustrap, global.ComponentFunctions));
		})(commonjsGlobal, (function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) { 'use strict';

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper__default.default();

		      this._addEventListeners();
		    } // Getters


		    static get Default() {
		      return Default;
		    }

		    static get DefaultType() {
		      return DefaultType;
		    }

		    static get NAME() {
		      return NAME;
		    } // Public


		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }

		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }

		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });

		      if (showEvent.defaultPrevented) {
		        return;
		      }

		      this._isShown = true;
		      this._isTransitioning = true;

		      this._scrollBar.hide();

		      document.body.classList.add(CLASS_NAME_OPEN);

		      this._adjustDialog();

		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }

		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }

		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

		      if (hideEvent.defaultPrevented) {
		        return;
		      }

		      this._isShown = false;
		      this._isTransitioning = true;

		      this._focustrap.deactivate();

		      this._element.classList.remove(CLASS_NAME_SHOW);

		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }

		    dispose() {
		      for (const htmlElement of [window, this._dialog]) {
		        EventHandler__default.default.off(htmlElement, EVENT_KEY);
		      }

		      this._backdrop.dispose();

		      this._focustrap.deactivate();

		      super.dispose();
		    }

		    handleUpdate() {
		      this._adjustDialog();
		    } // Private


		    _initializeBackDrop() {
		      return new Backdrop__default.default({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }

		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }

		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }

		      this._element.style.display = 'block';

		      this._element.removeAttribute('aria-hidden');

		      this._element.setAttribute('aria-modal', true);

		      this._element.setAttribute('role', 'dialog');

		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);

		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }

		      index.reflow(this._element);

		      this._element.classList.add(CLASS_NAME_SHOW);

		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }

		        this._isTransitioning = false;
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };

		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }

		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }

		        if (this._config.keyboard) {
		          event.preventDefault();
		          this.hide();
		          return;
		        }

		        this._triggerBackdropTransition();
		      });
		      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }

		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();

		            return;
		          }

		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }

		    _hideModal() {
		      this._element.style.display = 'none';

		      this._element.setAttribute('aria-hidden', true);

		      this._element.removeAttribute('aria-modal');

		      this._element.removeAttribute('role');

		      this._isTransitioning = false;

		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);

		        this._resetAdjustments();

		        this._scrollBar.reset();

		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      });
		    }

		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }

		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);

		      if (hideEvent.defaultPrevented) {
		        return;
		      }

		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }

		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }

		      this._element.classList.add(CLASS_NAME_STATIC);

		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);

		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);

		      this._element.focus();
		    }
		    /**
		     * The following methods are used to handle overflowing modals
		     */


		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

		      const scrollbarWidth = this._scrollBar.getWidth();

		      const isBodyOverflowing = scrollbarWidth > 0;

		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }

		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }

		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    } // Static


		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);

		        if (typeof config !== 'string') {
		          return;
		        }

		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }

		        data[config](relatedTarget);
		      });
		    }

		  }
		  /**
		   * Data API implementation
		   */


		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);

		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }

		    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }

		      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		        if (index.isVisible(this)) {
		          this.focus();
		        }
		      });
		    }); // avoid conflict when clicking modal toggler while another one is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }

		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions.enableDismissTrigger(Modal);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Modal);

		  return Modal;

		}));
		
	} (modal, modalExports));

	var Modal = modalExports;

	var offcanvasExports = {};
	var offcanvas = {
	  get exports(){ return offcanvasExports; },
	  set exports(v){ offcanvasExports = v; },
	};

	/*!
	  * Bootstrap offcanvas.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory(requireUtil(), requireScrollbar(), requireEventHandler(), requireBaseComponent(), requireSelectorEngine(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) :
		  typeof undefined === 'function' && undefined.amd ? undefined(['./util/index', './util/scrollbar', './dom/event-handler', './base-component', './dom/selector-engine', './util/backdrop', './util/focustrap', './util/component-functions'], factory) :
		  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Offcanvas = factory(global.Index, global.Scrollbar, global.EventHandler, global.BaseComponent, global.SelectorEngine, global.Backdrop, global.Focustrap, global.ComponentFunctions));
		})(commonjsGlobal, (function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) { 'use strict';

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): offcanvas.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'offcanvas';
		  const DATA_KEY = 'bs.offcanvas';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const ESCAPE_KEY = 'Escape';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const CLASS_NAME_HIDING = 'hiding';
		  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
		  const OPEN_SELECTOR = '.offcanvas.show';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
		  const Default = {
		    backdrop: true,
		    keyboard: true,
		    scroll: false
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    keyboard: 'boolean',
		    scroll: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Offcanvas extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isShown = false;
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();

		      this._addEventListeners();
		    } // Getters


		    static get Default() {
		      return Default;
		    }

		    static get DefaultType() {
		      return DefaultType;
		    }

		    static get NAME() {
		      return NAME;
		    } // Public


		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }

		    show(relatedTarget) {
		      if (this._isShown) {
		        return;
		      }

		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });

		      if (showEvent.defaultPrevented) {
		        return;
		      }

		      this._isShown = true;

		      this._backdrop.show();

		      if (!this._config.scroll) {
		        new ScrollBarHelper__default.default().hide();
		      }

		      this._element.setAttribute('aria-modal', true);

		      this._element.setAttribute('role', 'dialog');

		      this._element.classList.add(CLASS_NAME_SHOWING);

		      const completeCallBack = () => {
		        if (!this._config.scroll || this._config.backdrop) {
		          this._focustrap.activate();
		        }

		        this._element.classList.add(CLASS_NAME_SHOW);

		        this._element.classList.remove(CLASS_NAME_SHOWING);

		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };

		      this._queueCallback(completeCallBack, this._element, true);
		    }

		    hide() {
		      if (!this._isShown) {
		        return;
		      }

		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

		      if (hideEvent.defaultPrevented) {
		        return;
		      }

		      this._focustrap.deactivate();

		      this._element.blur();

		      this._isShown = false;

		      this._element.classList.add(CLASS_NAME_HIDING);

		      this._backdrop.hide();

		      const completeCallback = () => {
		        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);

		        this._element.removeAttribute('aria-modal');

		        this._element.removeAttribute('role');

		        if (!this._config.scroll) {
		          new ScrollBarHelper__default.default().reset();
		        }

		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };

		      this._queueCallback(completeCallback, this._element, true);
		    }

		    dispose() {
		      this._backdrop.dispose();

		      this._focustrap.deactivate();

		      super.dispose();
		    } // Private


		    _initializeBackDrop() {
		      const clickCallback = () => {
		        if (this._config.backdrop === 'static') {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }

		        this.hide();
		      }; // 'static' option will be translated to true, and booleans will keep their value


		      const isVisible = Boolean(this._config.backdrop);
		      return new Backdrop__default.default({
		        className: CLASS_NAME_BACKDROP,
		        isVisible,
		        isAnimated: true,
		        rootElement: this._element.parentNode,
		        clickCallback: isVisible ? clickCallback : null
		      });
		    }

		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }

		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }

		        if (!this._config.keyboard) {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }

		        this.hide();
		      });
		    } // Static


		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Offcanvas.getOrCreateInstance(this, config);

		        if (typeof config !== 'string') {
		          return;
		        }

		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }

		        data[config](this);
		      });
		    }

		  }
		  /**
		   * Data API implementation
		   */


		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);

		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }

		    if (index.isDisabled(this)) {
		      return;
		    }

		    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		      // focus on trigger when it is closed
		      if (index.isVisible(this)) {
		        this.focus();
		      }
		    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

		    if (alreadyOpen && alreadyOpen !== target) {
		      Offcanvas.getInstance(alreadyOpen).hide();
		    }

		    const data = Offcanvas.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
		      Offcanvas.getOrCreateInstance(selector).show();
		    }
		  });
		  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
		      if (getComputedStyle(element).position !== 'fixed') {
		        Offcanvas.getOrCreateInstance(element).hide();
		      }
		    }
		  });
		  componentFunctions.enableDismissTrigger(Offcanvas);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Offcanvas);

		  return Offcanvas;

		}));
		
	} (offcanvas, offcanvasExports));

	var Offcanvas = offcanvasExports;

	//
	// import Popover from 'bootstrap/js/dist/popover';
	// import Scrollspy from 'bootstrap/js/dist/scrollspy';
	// import Tab from 'bootstrap/js/dist/tab';
	// import Toast from 'bootstrap/js/dist/toast';
	// import Tooltip from 'bootstrap/js/dist/tooltip';


	//
	//  3. Expose the Bootstrap components that you want to use from other scripts (e.g. new bootstrap.Popover(...))
	//     If you disable any imports above, remove the corresponding export(s) here:
	//
	var bootstrap = {
	//    Alert,
	//    Button,
	//    Carousel,
	//    Collapse,
	//    Dropdown,
	    Modal,
	    Offcanvas
	//    Popover,
	//    Scrollspy,
	//    Tab,
	//    Toast,
	//    Tooltip
	};


	//
	//  4. Optionally, add your custom JavaScript below, either directly or by importing ES6 Modules.
	//     (Alternately, you can use the 'bootstrap' global object in external scripts.)
	//

	/**
	 * Preloader
	 */
	window.addEventListener('load',function(){
	  document.querySelector('body').classList.add("loaded");  
	});

	let toTop = document.querySelector('#top');

	toTop.addEventListener('click', function(e) {
	    e.preventDefault();
	    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	}); 

	/*! modernizr 3.6.0 (Custom Build) | MIT *
	 * https://modernizr.com/download/?-webp-setclasses !*/
	!function(e,n,A){function o(e,n){return typeof e===n}function t(){var e,n,A,t,a,i,l;for(var f in r)if(r.hasOwnProperty(f)){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(A=0;A<n.options.aliases.length;A++)e.push(n.options.aliases[A].toLowerCase());for(t=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],l=i.split("."),1===l.length?Modernizr[l[0]]=t:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=t),s.push((t?"":"no-")+l.join("-"));}}function a(e){var n=u.className,A=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+A+"no-js(\\s|$)");n=n.replace(o,"$1"+A+"js$2");}Modernizr._config.enableClasses&&(n+=" "+A+e.join(" "+A),c?u.className.baseVal=n:u.className=n);}function i(e,n){if("object"==typeof e)for(var A in e)f(e,A)&&i(A,e[A]);else {e=e.toLowerCase();var o=e.split("."),t=Modernizr[o[0]];if(2==o.length&&(t=t[o[1]]),"undefined"!=typeof t)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),a([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n);}return Modernizr}var s=[],r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var A=this;setTimeout(function(){n(A[e]);},0);},addTest:function(e,n,A){r.push({name:e,fn:n,options:A});},addAsyncTest:function(e){r.push({name:null,fn:e});}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=n.documentElement,c="svg"===u.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;f=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,A){return e.call(n,A)};}(),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e]);},0);},l._trigger=function(e,n){if(this._l[e]){var A=this._l[e];setTimeout(function(){var e,o;for(e=0;e<A.length;e++)(o=A[e])(n);},0),delete this._l[e];}},Modernizr._q.push(function(){l.addTest=i;}),Modernizr.addAsyncTest(function(){function e(e,n,A){function o(n){var o=n&&"load"===n.type?1==t.width:!1,a="webp"===e;i(e,a&&o?new Boolean(o):o),A&&A(n);}var t=new Image;t.onerror=o,t.onload=o,t.src=n;}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],A=n.shift();e(A.name,A.uri,function(A){if(A&&"load"===A.type)for(var o=0;o<n.length;o++)e(n[o].name,n[o].uri);});}),t(),a(s),delete l.addTest,delete l.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr;}(window,document);


	function home() {

	  /* Dynamic Content for Modal */
	  const exampleModal = document.getElementById('exampleModal');
	  exampleModal.addEventListener('show.bs.modal', event => {
	    // Button that triggered the modal
	    const button = event.relatedTarget;
	    // Extract info from data-bs-* attributes
	    const recipient = button.getAttribute('data-bs-whatever');
	    const dimage = button.getAttribute('data-bs-image');
	    const dbio = button.getAttribute('data-bs-bio');
	    // If necessary, you could initiate an AJAX request here
	    // and then do the updating in a callback.
	    //
	    // Update the modal's content.
	    const modalTitle = exampleModal.querySelector('.modal-title');
	    const modalImage = exampleModal.querySelector('.modal-image');
	    const modalBio = exampleModal.querySelector('.modal-bio');

	    modalTitle.textContent = `New message to ${recipient}`;
	    modalImage.src = dimage;
	    modalBio.innerHTML = dbio;
	  });

	  /* Process Swiper */
	  var swiper = new Swiper(".mySwiper", {
	    navigation: {
	      nextEl: ".swiper-button-next",
	      prevEl: ".swiper-button-prev"
	    },
	    grabCursor: true,
	    loop: true,
	    // If we need pagination
	    pagination: {
	      el: '.swiper-pagination',
	      clickable: true
	    },

	    // And if we need scrollbar
	    scrollbar: {
	      el: '.swiper-scrollbar'
	    },
	    effect: "creative",
	    creativeEffect: {
	      prev: {
	        shadow: true,
	        translate: [0, 0, -400]
	      },
	      next: {
	        translate: ["100%", 0, 0]
	      },
	    },
	    on: {
	      slideChange: function () {
	        var activeIndex = this.activeIndex;
	        var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');
	        //console.log(realIndex)

	        let swiperIndex = document.getElementById('swiperinfo-'+realIndex);

	        var divsToHide = document.getElementsByClassName("swiperinfo"); //divsToHide is an array
	        for(var i = 0; i < divsToHide.length; i++){
	            divsToHide[i].classList.remove("doanim");
	        }
	        swiperIndex.classList.add("doanim");
	      },
	    }
	  });

	  /* fix position absolute on mobile */
	  function equalHeight() {
	  var max = 0;
	  document.querySelectorAll('.swiperinfo').forEach(
	    function(el) {
	      //console.info(Math.max(el.scrollHeight, max));
	      if (el.scrollHeight > max) {
	        max = el.scrollHeight;
	      }
	    }
	  );
	  let sodone = document.getElementById('sodone');
	  sodone.style.height = max+"px";
	  return max;
	  }
	  var max = equalHeight();

	  window.addEventListener("resize", equalHeight);
	  let sodone = document.getElementById('sodone');
	  sodone.style.height = max+"px";

	}


	function doc(){
	  AOS.init({
	    duration: 1000,
	    easing: "ease-in-out",
	    once: true,
	    mirror: false
	  });

	  document.addEventListener('aos:in', ({ detail }) => {
	    //console.log('animated in', detail);
	    setTimeout(()=> {
	      function createRandom(min, max){
	          var Num = Math.random() * (max - min + 1) + min;
	          return Num;
	        }


	        var polaroids = document.getElementsByClassName("card-figure-rotate");
	        for (var i = 0; i < polaroids.length; i++) {
	          var rotatethis = createRandom(-5,5);
	          polaroids.item(i).style.transform="rotate("+rotatethis+"deg)";
	        }
	      }
	    ,1000);
	  });
	  document.addEventListener('aos:out', ({ detail }) => {
	    //console.log('animated out', detail);
	  });

	}

	function init() {
	  
	  var date = new Date().getFullYear();
	  document.getElementById("current-year").innerHTML = date;

	  if (document.querySelector('.body-home')) {
	    home();
	  }
	  if (document.querySelector('.body-doc')) {
	    doc();
	  }
	}

	init();

	return bootstrap;

})();
//# sourceMappingURL=bootstrap.js.map
