import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render ("index.ejs", {
        content: "Waiting for data..."
    });
})

const API_URL = "https://api.qrserver.com/v1/create-qr-code/";


app.post("/submit", async (req, res) => {
    try {
        let urlInput = req.body.url;
        let sizeInput = "&size=" + req.body.size;
        let qrCode = urlInput + sizeInput;
        console.log("User Input: " + qrCode);
        // const response = await axios.post(API_URL + "?data=" + urlInput);
        res.render("index.ejs", { qrCode: qrCode });
    } catch (error) {
        res.render("index.ejs", error);
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})