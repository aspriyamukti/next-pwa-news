import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const fetchNews = async () => {
      try {
        if (navigator.onLine) {
          const res = await fetch('/api/news');
          const data = await res.json();
          setArticles(data.articles);
          localStorage.setItem('news-articles', JSON.stringify(data.articles));
        } else {
          const cached = localStorage.getItem('news-articles');
          if (cached) {
            setArticles(JSON.parse(cached));
          }
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        const cached = localStorage.getItem('news-articles');
        if (cached) {
          setArticles(JSON.parse(cached));
        }
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>{isOnline ? 'Online News' : 'Offline News (Cached)'}</h1>
      {articles?.length > 0 ? (
        articles?.map((article, index) => (
          <div key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </div>
        ))
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
}