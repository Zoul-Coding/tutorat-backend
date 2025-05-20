
const express = require("express");
require('dotenv').config({ path: './config/.env'});
require('./config/connectDB');

const app = express();
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const projectRoutes = require("./routes/ProjectRoutes");
const taskRoutes = require("./routes/TaskRoutes")

app.use(express.json());
app.use(cors());

//routes
app.use('/api', authRoutes, userRoutes, projectRoutes, taskRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log("The server is listening ...");
});

