require('dotenv').config();
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const blogRoute = require("./routes/blog");
const Blog = require('./Models/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/blog-user")
    .then(e => console.log("connected"))
    .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.use('/user', userRoutes);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
});



app.listen(port, () => {
    console.log("Server started at port ", port);
})
