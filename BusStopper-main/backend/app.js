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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
