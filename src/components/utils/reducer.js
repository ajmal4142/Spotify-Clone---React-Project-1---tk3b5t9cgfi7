export const initialState = {
  list: null,
  token: null,
  selectedCard: null,
  selectedSong: null,
  selectedArtist: null,
  searchClicked: false,
  name: null,
  id: null,
  favorites: [],
  searchSong: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, list: action.payload };
    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };
    case "SET_SELECTED_SONG":
      return { ...state, selectedSong: action.payload };
    case "SET_SELECTED_ARTIST":
      return { ...state, selectedArtist: action.payload };
    case "SET_SEARCH_CLICKED":
      return { ...state, searchClicked: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_SEARCH_SONG":
      return { ...state, searchSong: action.payload };
    case "ADD_FAVORITE":
      return { ...state, favorites: action.payload };
    case "TOGGLE_FAVORITE":
      const updatedFavorites = [...state.favorites];
      const song = action.payload;
      const index = updatedFavorites?.findIndex(
        (item) => item._id === song._id,
      );
      if (index === -1) {
        updatedFavorites.push(song);
      } else {
        updatedFavorites.splice(index, 1);
      }
      return { ...state, favorites: updatedFavorites };

    default:
      return state;
  }
};

export default reducer;
