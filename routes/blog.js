const { Router } = require('express');
const User = require("../Models/user");
const Blog = require('../Models/blog');
const router = Router();

router.get("/addNew", (req, res) => {
    return res.render("blog", {
        user: req.user
    });
});

router.post("/", (req, res) => {
    const { title, blog, desc } = req.body;

    const newBlog = new Blog({
        title: title,
        blog: blog,
        desc: desc,
        createdBy: req.user._id
    });

    newBlog.save()
        .then(() => {
            res.redirect(`/blog/${newBlog._id}`);
        })
        .catch((e) => console.error(e));

});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    console.log(blog);
    return res.render('showBlog', {
        user: req.user,
        blog,
    });
})

module.exports = router;