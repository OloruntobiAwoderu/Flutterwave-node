const express =  require("express");
const  bodyParser = require( "body-parser");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;






app.use("/*", (req, res) =>
  res.status(404).json({ message: "This endpoint does not exist" })
);

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});

