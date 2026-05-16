const express = require('express');
const app = express();

app.use(express.json());

// Routes
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