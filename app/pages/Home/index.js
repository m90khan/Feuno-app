import Page from 'components/Page';

export default class extends Page {
  constructor() {
    super({
      id: 'Home',
      // classes: {
      //   active: 'home--active',
      // },
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        link: '.home__link',
        wrapper: '.home__content',
      },
    });
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
  create() {
    super.create();
    this.elements.link.addEventListener('click', () => console.log('click'));
  }
}
