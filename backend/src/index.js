require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: [
    'https://sql-ai-here.netlify.app',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const historyRoutes = require('./routes/history');
const queryRoutes = require('./routes/query');

app.use('/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/history', historyRoutes);
app.use('/query', queryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});