import GSAP from 'gsap';
import Prefix from 'prefix';

import Component from 'classes/Component';
import { each } from 'lodash';
import { split } from 'utils/text';
export default class extends Component {
  constructor() {
    super({
      classes: {},
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        numberText: '.preloader__number__text',
        images: document.querySelectorAll('img'),
      },
    });
    split({
      element: this.elements.title,
      expression: '<br>',
    });
    split({
      element: this.elements.title,
      expression: '<br>',
    });
    this.elements.titleSpans = this.elements.title.querySelectorAll('span span');
    // this.counter = 0;
    // this.index = 0;

    // this.transformPrefix = Prefix('transform');

    console.log(this.elements.titleSpans);
    this.length = 0;
    this.createLoader();
  }
  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = (e) => {
        this.onAssetLoaded(element);
      };
      element.src = element.getAttribute('data-src');
    });
  }
  onAssetLoaded(image) {
    this.length += 1;
    const percent = this.length / this.elements.images.length;
    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;
    if (percent == 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 1,
      });
      this.animateOut.to(this.elements.titleSpans, {
        duration: 1.5,
        ease: 'expo.out',
        y: '100%',
        stagger: 0.3,
      });
      this.animateOut.to(
        this.elements.numberText,
        {
          duration: 1.5,
          ease: 'expo.out',
          y: '100%',
          stagger: 0.3,
        },
        '-=1.4'
      );
      this.animateOut.to(
        this.element,
        {
          duration: 1.5,
          ease: 'expo.out',
          scaleY: 0,
          duration: 1,
          transformOrigin: '100% 100%',
        },
        '-=1'
      );
      this.animateOut.call((_) => {
        this.emit('completed');
      });
    });
  }
  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
  // onComplete() {
  //   this.timeline = GSAP.timeline();

  //   this.timeline.to(this.element, {
  //     autoAlpha: 0,
  //     duration: 1,
  //   });

  //   this.timeline.call((_) => {
  //     this.emit('complete');
  //   });
  // }
}
