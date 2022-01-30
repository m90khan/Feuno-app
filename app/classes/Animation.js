import _ from 'lodash';
import Prefix from 'prefix';
import Component from './Component';

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({ element, elements });
    // const { animationDelay, animationTarget } = element.dataset;

    // this.delay = animationDelay;

    // this.element = element;
    // this.elements = elements;

    // this.target = animationTarget ? element.closest(animationTarget) : element;
    // this.transformPrefix = Prefix('transform');

    // this.isVisible = false;
    this.createObserver();

    this.animateOut();
    // if ('IntersectionObserver' in window) {
    //   this.createObserver();

    //   this.animateOut();
    // } else {
    //   this.animateIn();
    // }
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();
          console.log('animate in');
        } else {
          console.log('animate out');
          this.animateOut();
        }
      });
    });

    this.observer.observe(this.element);
  }

  animateIn() {
    // this.isVisible = true;
  }

  animateOut() {
    // this.isVisible = false;
  }
}

//test
