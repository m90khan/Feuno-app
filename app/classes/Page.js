import each from 'lodash/each';
import GSAP from 'gsap';
import Prefix from 'prefix';
import normalizeWheel from 'normalize-wheel';

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { ...elements };
    this.id = id;
    this.transformPrefix = Prefix('transform');
    this.onMouseWheelEvent = this.onMouseWheel.bind(this);
    // this.scroll = {
    //   current: 0, // current scroll position
    //   target: 0, // target position
    //   last: 0, // last position of scroll
    //   limit: 0, // limit of scrolling in px
    // };
  }
  create() {
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    };
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

  show() {
    return new Promise((resolve) => {
      this.animateIn = GSAP.timeline();
      this.animateIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          onComplete: resolve,
        }
      );
      this.animateIn.call((_) => {
        this.addEventListeners();
        resolve();
      });
    });
  }
  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners(); // remove the event listenres before animate
      this.animateOut = GSAP.timeline();

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }
  // Scroll

  onMouseWheel(e) {
    const { pixelY } = normalizeWheel(e);
    this.scroll.target += pixelY;
    // this.scroll.target += deltaY;
  }
  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight;
    }
  }
  update() {
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target);

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.05
    );
    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }
    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }
  // Event Listeners
  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheelEvent);
  }
  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent);
  }
}
