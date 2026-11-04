import { Outlet, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Layout() {
  const { favorites } = useFavorites();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/posts" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Посты</Link>
        </nav>
        <div>
          <Link to="/favorites" style={{ textDecoration: 'none' }}>
            ⭐ Избранное: <strong>{favorites.length}</strong>
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}