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
  
      <div className="grid-container">
        {articles?.length > 0 ? (
          articles.map((article, index) => (
            <div className="news-card" key={index}>
              {article.urlToImage && (
                <img className="news-image" src={article.urlToImage} alt="News" />
              )}
              <div className="news-content">
                <div className="news-meta">
                  By {article.author || 'Unknown'} |{' '}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
                <div className="news-title">{article.title}</div>
                <div className="news-description">{article.description}</div>
                <a
                  className="news-link"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Full Article →
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </div>
  
      <style jsx>{`
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
  
        .grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

  
        .news-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
  
        .news-card:hover {
          transform: translateY(-5px);
        }
  
        .news-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
  
        .news-content {
          padding: 1.2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
  
        .news-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
  
        .news-description {
          color: #555;
          margin-bottom: 1rem;
          flex: 1;
        }
  
        .news-meta {
          font-size: 0.875rem;
          color: #888;
          margin-bottom: 0.5rem;
        }
  
        .news-link {
          text-decoration: none;
          color: #1a73e8;
          font-weight: bold;
          align-self: flex-start;
        }
  
        .news-link:hover {
          text-decoration: underline;
        }
  
        body {
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </div>
  );
  
}
