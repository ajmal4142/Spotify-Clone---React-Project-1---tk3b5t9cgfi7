export const initialState = {
  token: null,
  selectedCard: null,
  selectedSong: null,
  selectedArtist: null,
  searchClicked: false,
  name: null,
  id: null,
  favorites: [],
};

const reducer = (state, action) => {
  switch (action.type) {
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
    case "SET_SELECTED_ID":
      return { ...state, name: action.payload };
    case "REMOVE_FAVORITE":
      const songIdToRemove = action.payload.album;
      const newFavoritesRemove = state.favorites.filter(
        (id) => id !== songIdToRemove,
      );
      return { ...state, favorites: newFavoritesRemove };
    case "ADD_FAVORITE":
      const songIdToAdd = action.payload.album;
      if (!state.favorites.includes(songIdToAdd)) {
        const newFavoritesAdd = [...state.favorites, songIdToAdd];
        return { ...state, favorites: newFavoritesAdd };
      } else {
        return state; // Song is already a favorite, return the current state
      }

    default:
      return state;
  }
};

export default reducer;
