import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(state.recipe);
  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
}

async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
}

function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

function updateServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
}

function persistBookmark() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

function addBookmark(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
}

function deleteBookmark(id) {
  // Remove bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
}

function init() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}

function clearBookmarks() {
  localStorage.clear('bookmarks');
}

async function uploadRecipe(newRecipe) {}

init();
// clearBookmarks();

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookmark,
  persistBookmark,
  uploadRecipe
};
