import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = '(☞ﾟヮﾟ)☞ Go bookmarks some recipes.';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarksView();
