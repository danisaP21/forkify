import { API_URL } from './config';
import { getJSON } from './helpers';

const state = {
  recipe: {},
};

async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

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
    console.log(state.recipe);
  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
}

async function loadSearchResults(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
}
loadSearchResults('pizza');
export { state, loadRecipe, loadSearchResults };
