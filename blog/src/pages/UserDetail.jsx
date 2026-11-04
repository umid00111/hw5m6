import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error('Пользователь не найден');
  return res.json();
};

const fetchUserPosts = async (userId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  if (!res.ok) throw new Error('Ошибка загрузки постов пользователя');
  return res.json();
};

export default function UserDetail() {
  const { id } = useParams();

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', { userId: id }],
    queryFn: () => fetchUserPosts(id),
    enabled: !!id,
  });

  if (userLoading) return <p>Загрузка профиля...</p>;
  if (userError) return <p>{userError.message}</p>;

  return (
    <div>
      <Link to="/posts">&larr; Назад к постам</Link>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Город:</strong> {user.address?.city}</p>

      <h3 style={{ marginTop: '30px' }}>Посты пользователя:</h3>
      {postsLoading ? (
        <p>Загрузка постов...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px', borderRadius: '4px' }}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}