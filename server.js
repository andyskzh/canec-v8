const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const queryRoutes = require('./routes/queryRoutes');



// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de autenticación
app.use('/api/auth', authRoutes);

// Usar rutas de usuarios
app.use('/api/users', userRoutes);

app.use('/api/queries', queryRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Definir un puerto y escuchar peticiones
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Rutas básicas (temporales)
app.get('/', (req, res) => {
  res.send('Hello World!');
});
