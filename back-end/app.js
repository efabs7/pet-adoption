require("dotenv").config();

const express = require("express");

const app = express();
const { getUserByIdService } = require("./services/userService");

const cors = require("cors");
const { verify } = require("./utils/jwt");
const fs = require("fs");
const bodyParser = require("body-parser");
// const uploader = require("./config/multer");
const multer = require("multer");
const cloudinary = require("./config/cloudinary");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

async function uploadImgToCloudinary(localFilePath) {
  const mainFolder = "main";
  const filePathOnCloud = mainFolder + "/" + localFilePath;

  return cloudinary.uploader
    .upload(localFilePath, { public_id: filePathOnCloud })
    .then((result) => {
      fs.unlinkSync(localFilePath);

      return {
        message: "success",
        url: result.url,
      };
    })
    .catch((error) => {
      console.log(error);
      fs.unlinkSync(localFilePath);
      return { message: "whoops" };
    });
}

app.use(async (req, res, next) => {
  if (
    (req.method === "POST" && req.url === "/signup") ||
    (req.method === "POST" && req.url === "/login") ||
    (req.method === "GET" && req.url.startsWith("/pets")) ||
    (req.method === "GET" && req.url === "/upload")
  ) {
    return next();
  }
  console.log(req.headers);
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  console.log(token, "this is from the req headers");
  const data = verify(token);
  console.log(data);

  if (!data) {
    return res
      .status(401)
      .send("sorry; you are not authorized to use this service");
  }
  const user = await getUserByIdService(data.id);
  req.user = user;
  console.log(user);

  // if (user.name === "hermione" && user.email === "hermione@hermione.com") {
  //   const permissionId = 1;
  //   res.status(200).send({ permissions: permissionId });
  // } else {
  //   res.status(200).send({ permissions: 0 });
  // }

  next();
});

app.use("/login", require("./routes/auth.route"));
app.use("/signup", require("./routes/signup.route"));
app.use("/users", require("./routes/users.route"));
app.use("/pets", require("./routes/pets.route"));
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("called uplaod");

  const result = await uploadImgToCloudinary(req.file.path);
  console.log(result);
  res.status(201).send(JSON.stringify({ url: result.url }));
});

app.use((error, req, res, next) => {
  res.status(500).send(error);
});
app.listen(4000, () => {
  console.log("app listening on port 4000 like the year");
});
