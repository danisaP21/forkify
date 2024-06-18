import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMessage = 'No recipes found!';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
