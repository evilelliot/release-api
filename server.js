import express from 'express';
import axios from 'axios';

const app = express();
const defaultPort = 3000;

app.get('/releases/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const token = req.query.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'GitHub Release API',
      },
    };

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      options
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los releases' });
  }
});

const server = app.listen(process.env.PORT || defaultPort, () => {
  const actualPort = server.address().port;
  console.log(`API running on http://localhost:${actualPort}`);
});

export default server;
