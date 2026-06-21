const express = require('express');
const pool = require('./src/config/db');
const cors = require('cors')
const authRoutes = require('./src/modules/auth/auth.routes.js')
const userRole = require('./src/modules/user-role/user-role.routes.js')
const err = require('./src/middleware/error.middleware.js')

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes)
app.use('/api/user-role', userRole)


app.use(err.errorMiddleware)

app.server = app.listen(PORT, () => {
  console.log(`
    running on ${process.env.APP_URL_DEV}:${PORT}`
  );
});