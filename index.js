require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");

const { router } = require("./src/routes");

const app = express();
app.use(
  fileUpload({
    preserveExtension: 5,
    safeFileNames: true,
    parseNested: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(
  process.env.PORT || 8080, 
  () => console.log(`server listening on port ${process.env.PORT || 8080}`)
);
