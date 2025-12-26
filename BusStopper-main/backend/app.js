// backend/app.js

const express = require('express');
const path = require('path');
const app = express();

const apiRoutes = require('./routes/api'); 

// Разрешаем JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

// Роуты API
app.use('/api', apiRoutes);

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`BusTracker_Siuzanna started on port ${PORT}`);
});
