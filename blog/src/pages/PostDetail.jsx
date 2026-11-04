import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '../context/FavoritesContext';

const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Пост не найден');
  return res.json();
};

const fetchUser = async (userId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) throw new Error('Пользователь не найден');
  return res.json();
};

export default function PostDetail() {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetchUser(post.userId),
    enabled: !!post?.userId, // Запрос выполнится только когда появится userId
  });

  if (postLoading) return <p>Загрузка поста...</p>;
  if (postError) return <p>{postError.message}</p>;

  const fav = isFavorite(post.id);

  return (
    <div>
      <Link to="/posts">&larr; Назад к списку</Link>
      <h2>{post.title}</h2>
      <p style={{ lineHeight: '1.6' }}>{post.body}</p>
      
      <p style={{ marginTop: '20px' }}>
        Автор:{' '}
        {userLoading ? (
          'Загрузка автора...'
        ) : (
          <Link to={`/users/${user?.id}`}>{user?.name}</Link>
        )}
      </p>

      <button
        onClick={() => (fav ? removeFavorite(post.id) : addFavorite(post))}
        style={{ cursor: 'pointer', padding: '6px 12px', marginTop: '10px' }}
      >
        {fav ? '❤️ В избранном' : '🤍 В избранное'}
      </button>
    </div>
  );
}