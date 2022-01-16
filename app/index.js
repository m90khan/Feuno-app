import About from 'pages/About';
import Home from 'pages/Home';
import Collections from 'pages/Collections';
import Detail from 'pages/Detail';

class App {
  constructor() {
    this.createContent();
    this.createPages();
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
    this.page.create();
    this.page.show();
  }
}
new App();

console.log(
  '%c Developed by Khan - https://uxdkhan.com/',
  'background: #000; color: #fff;'
);
