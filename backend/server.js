require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require ('cors')
const { errorHandler, notFound } = require("./middleware/error/errorHandler");
const categoryRoute = require("./routes/category/categoryRoute");
const commentRouter = require("./routes/commentRoute/commentRoute");
const emailMsgRoute = require("./routes/emailMsg/emailMsgRoute");
const postRoute = require("./routes/postRoute/postRoutes");
const userRoute = require("./routes/userRoute/userRoute");
const port = process.env.PORT || 5000 ;
const app = express();

app.use(express.json());

// proxy support
app.enable("trust proxy");

// cross origin request support for development
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// ROUTES

app.use('/api/users/', userRoute)
app.use('/api/posts/', postRoute)
app.use('/api/comment/', commentRouter)

app.use("/api/email", emailMsgRoute);
//category route
app.use("/api/category", categoryRoute);

// error handlers
app.use(notFound)
app.use(errorHandler)

// mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

