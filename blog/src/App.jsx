import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PostsList from './pages/PostsList';
import PostDetail from './pages/PostDetail';
import UserDetail from './pages/UserDetail';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/posts" replace />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}