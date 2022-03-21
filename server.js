const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;
const {
    signup,
    login,
    logout,
    isAuth,
    userBasedFunc,
} = require("./routes/api/users");

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/sellers", require("./routes/api/sellers"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/categories", require("./routes/api/categories"));
app.use("/api/subCategories", require("./routes/api/subCategories"));
app.use("/api/childSubCategories", require("./routes/api/childSubCategories"));
app.use("/api/sizes", require("./routes/api/sizes"));
app.use("/api/stocks", require("./routes/api/stocks"));
app.use("/api/cities", require("./routes/api/cities"));
app.use("/api/seller_cities", require("./routes/api/seller_cities"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log("Server started on port " + PORT));