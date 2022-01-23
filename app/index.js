import About from 'pages/About';
import Home from 'pages/Home';
import Collections from 'pages/Collections';
import Detail from 'pages/Detail';
import Preloader from './components/Preloader';

class App {
  constructor() {
    this.createPreloader();
    this.createContent();
    this.createPages();
    this.addLinkListeners();
  }
  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }
  onPreloaded() {
    this.preloader.destroy();
    this.page.show();
  }
  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }
  createPages() {
    this.pages = {
      detail: new Detail(),
      collections: new Collections(),
      home: new Home(),
      about: new About(),
    };
    this.page = this.pages[this.template];
    console.log('page', this.page);
    this.page.create();
  }
  async onChange(url) {
    await this.page.hide();
    const request = await window.fetch(url);
    if (request.status === 200) {
      const html = await request.text();
      const fakeDiv = document.createElement('div');
      fakeDiv.innerHTML = html;
      const divContent = fakeDiv.querySelector('.content');
      this.template = divContent.getAttribute('data-template');
      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();
      this.addLinkListeners();
    } else {
      console.log('error');
    }
  }
  addLinkListeners() {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      //
      link.onclick = (event) => {
        const { href } = link;
        event.preventDefault();
        this.onChange(href);
      };
    });
  }
}
new App();

console.log(
  '%c Developed by Khan - https://uxdkhan.com/',
  'background: #000; color: #fff;'
);
