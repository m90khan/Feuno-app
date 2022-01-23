import AutoBind from 'auto-bind';
import EventEmitter from 'events';

import each from 'lodash/each';

export default class extends EventEmitter {
  constructor({ classes, element, elements }) {
    super(); // initialize the contructor of the EventEmitter

    // AutoBind(this)
    this.selector = element;
    this.selectorChildren = { ...elements };
    this.create();
    this.addEventListeners();
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};
    each(this.selectorChildren, (selector, key) => {
      if (selector instanceof window.HTMLElement || selector instanceof window.NodeList) {
        this.elements[key] = selector;
      } else if (Array.isArray(selector)) {
        this.elements[key] = selector;
      } else {
        this.elements[key] = this.element.querySelectorAll(selector);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(selector);
        }
      }
    });
  }

  addEventListeners() {}

  removeEventListeners() {}

  destroy() {
    this.removeEventListeners();
  }
}
