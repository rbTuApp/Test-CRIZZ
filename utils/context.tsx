import React, { useReducer, createContext } from 'react';
const initialState = {
    favorites: [],
};

const MoviesContext = createContext({
    favorites: [],
    setFavorites: (favorite: any) => { },
    deleteFavorites: (favorite: any) => { },
});
function authReducer(state: any, action: any) {
    switch (action.type) {
        case "SET_FAVORITES":
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case "DELETE_FAVORITES":
            const favoritesFilter = state.favorites.filter(
                (c: any) => c.id !== action.payload.id
            );
            return {
                ...state,
                favorites: favoritesFilter,
            };
        default:
            return state;
    }
}
function MoviesProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const setFavorites = (favorite: any) => {
        dispatch({
            type: 'SET_FAVORITES',
            payload: favorite,
        });
    }
    const deleteFavorites = (favorite: any) => {
        dispatch({
            type: 'DELETE_FAVORITES',
            payload: favorite,
        });
    }

    return (
        <MoviesContext.Provider
            value={{
                setFavorites,
                deleteFavorites,
                favorites: state.favorites,
            }}
            {...props}
        />
    );
}

export { MoviesContext, MoviesProvider };
