const { Router } = require('express');
const User = require("../Models/user");
const router = Router();

router.get("/singup", (req, res) => {
    return res.render('singup');
});

router.get("/singin", (req, res) => {
    return res.render('singin');
});

router.post("/singup", async (req, res) => {
    const { fullname, email, password } = req.body;

    const newUser = new User({
        fname: fullname,
        email: email,
        password: password
    });

    newUser.save()
        .then(e => console.log("User is saved"))
        .catch(e => console.error(e));

    return res.redirect("/");
});

router.post("/singin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassAndCreateToken(email, password);
        res.cookie("token", token).redirect("/");
    } catch (err) {
        res.render("singin", {
            error: "Invalide"
        });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

module.exports = router;
