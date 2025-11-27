require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lisez-moi';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Routes API
app.get('/', (req, res) => {
  res.json({ 
    message: 'API LISEZ-Moi', 
    status: 'ok',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.get('/api/articles', (req, res) => {
  res.json([
    {
      id: 1,
      title: "L'intelligence artificielle redéfinit la créativité",
      category: "Sciences",
      author: "Jean-Pierre Dubois",
      excerpt: "Une révolution silencieuse s'opère dans le monde de l'art...",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "Haïti : les défis de la reconstruction",
      category: "Politique",
      author: "Marie Clément",
      excerpt: "Analyse des enjeux politiques et diplomatiques...",
      readTime: "12 min"
    }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur LISEZ-Moi sur port ${PORT}`);
});
