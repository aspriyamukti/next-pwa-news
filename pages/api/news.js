export default async function handler(req, res) {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=433599a94aeb4c69b5427e702692cc81');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching news' });
    }
  }