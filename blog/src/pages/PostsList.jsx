import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Ошибка загрузки постов');
  return res.json();
};

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Ошибка загрузки пользователей');
  return res.json();
};

export default function PostsList() {
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (postsLoading || usersLoading) return <p>Загрузка данных...</p>;
  if (postsError || usersError) return <p>Произошла ошибка при загрузке.</p>;

  // Создаем карту пользователей для быстрого поиска по userId
  const usersMap = new Map(users.map((u) => [u.id, u]));

  return (
    <div>
      <h2>Список постов</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => {
          const author = usersMap.get(post.userId);
          const fav = isFavorite(post.id);

          return (
            <li key={post.id} style={{ border: '1px solid #eee', padding: '15px', marginBottom: '10px', borderRadius: '6px' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                Автор: <Link to={`/users/${post.userId}`}>{author ? author.name : 'Неизвестен'}</Link>
              </p>
              <button
                onClick={() => (fav ? removeFavorite(post.id) : addFavorite(post))}
                style={{ cursor: 'pointer', padding: '5px 10px' }}
              >
                {fav ? '❤️ В избранном' : '🤍 В избранное'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}