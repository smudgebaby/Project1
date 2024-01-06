const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products'); 

const app = express();

mongoose.connect('mongodb://username:password@host:port/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));