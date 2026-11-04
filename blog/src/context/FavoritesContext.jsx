import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (post) => {
    if (!favorites.some((p) => p.id === post.id)) {
      setFavorites([...favorites, post]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((p) => p.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);