import express from "express";
import routes from "./routes.js";
import db from "./src/db.js";

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") 
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()

})

app.use(routes);

db.sync()
  .then(() => {
    console.log("Conexão estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error(
      "Não foi possível estabelecer conexão com o banco de dados:",
      error
    );
  });

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
