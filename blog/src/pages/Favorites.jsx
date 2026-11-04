import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <div>
      <h2>Избранные посты</h2>
      {favorites.length === 0 ? (
        <p>Список избранного пуст.</p>
      ) : (
        <>
          <button
            onClick={clearFavorites}
            style={{ marginBottom: '15px', padding: '5px 10px', cursor: 'pointer' }}
          >
            Очистить всё
          </button>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {favorites.map((post) => (
              <li
                key={post.id}
                style={{
                  border: '1px solid #eee',
                  padding: '10px',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <button
                  onClick={() => removeFavorite(post.id)}
                  style={{ cursor: 'pointer', padding: '3px 8px' }}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}