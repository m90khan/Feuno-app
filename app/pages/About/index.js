import Page from 'classes/Page';

export default class extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        navigation: document.querySelector('.navigation'),
        wrapper: '.about__content',
      },
    });
  }
}

/**
 * Animations.
 */
// async show(url) {
//   this.element.classList.add(this.classes.active);

//   return super.show(url);
// }

// async hide(url) {
//   this.element.classList.remove(this.classes.active);

//   return super.hide(url);
// }
