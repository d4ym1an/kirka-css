const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ratings = {}; // In-memory storage for simplicity

// Endpoint to submit a rating
app.post('/api/rate', (req, res) => {
  const { id, rating } = req.body;

  if (!ratings[id]) {
    ratings[id] = { total: 0, count: 0 };
  }

  ratings[id].total += rating;
  ratings[id].count += 1;

  res.status(200).send({ success: true });
});

// Endpoint to get aggregated ratings
app.get('/api/ratings', (req, res) => {
  const averages = {};
  for (const id in ratings) {
    averages[id] = {
      average: ratings[id].total / ratings[id].count
    };
  }
  res.status(200).send(averages);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
