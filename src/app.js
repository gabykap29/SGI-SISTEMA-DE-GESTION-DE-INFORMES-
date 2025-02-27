const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");

const app = express();

require("ejs");
app.set("view engine", "ejs");

// Carpeta pública
app.use(express.static("public"));
const nameLog = new Date().toISOString().slice(0, 10).replace(/:/g, "-");
//guardar todas las peticiones al servidor en un archivo de texto
const accessLogStream = fs.createWriteStream(`./logs/${nameLog}.log`, {
  flags: "a",
});
if (!fs.existsSync(__dirname + "/public/uploads")) {
  fs.mkdirSync(__dirname + "/public/uploads");
}

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors('*'));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// Variables de entorno
dotenv.config({ path: "./env/.env" });

app.use(require("./routes/auth.routes"));
app.use(require("./routes/usuarios.routes"));
app.use(require("./routes/reports.routes"));
app.use(require("./routes/person.routes"));
app.use(require("./routes/departament.routes"));
app.use(require("./routes/locality.routes"));
app.use(require("./routes/tools.routes"));
const server = https.createServer(
  {
    key: fs.readFileSync("./server.key"), // Ruta al archivo de clave privada
    cert: fs.readFileSync("./server.cer"), // Ruta al archivo de certificado
  },
  app
);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "10.0.37.208";

// Si ingresan a una ruta no declarada, se redirigirá al inicio.
app.use((req, res, next) => {
  res.render("error/error");
});

server.listen(port, host, () => {
  console.log(`servidor corriendo en https://${host}:${port}/login`);
});
