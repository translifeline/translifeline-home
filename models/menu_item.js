'use strict';

/*
Represents a menu item.
*/
class MenuItem {
  /*
  label - The displayed label for this item.
  url - If provided, this is the url the MenuItem links to.
  submenu - A MenuItem array representing items in a drop down menu.
  */
  constructor(label, url, submenu) {
    this.label = label;
    if (url) {
      this.url = url;
    }
    if (submenu) {
      this.submenu = submenu;
    }
  }
}

module.exports = MenuItem;
