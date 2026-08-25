import express from "express";
import mysql from "mysql2/promise";
import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import jwt from "jsonwebtoken";
import cors from "cors";

import Login from "./login.js";
import ConfigurarListaPessoas from "./pessoa.js";
import Endereco from "./endereco.js";
import Telefone from "./telefone.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/swagger/*.js"],
};

const specs = swaggerJsdoc(options);

const swaggerConfig = {swaggerOptions: {persistAuthorization: true,},

  customJsStr:`(() => {const originalFetch = window.fetch;window.fetch = async (...args) => {

        const response = await originalFetch(...args);

        try {

          const request = args[0];

          const url = typeof request === "string"
              ? request
              : request?.url;

          if (
            url &&
            url.includes("/login") &&
            response.ok) {

            const clone = response.clone();

            const data = await clone.json();

            if (data?.token && window.ui) {

              window.ui.preauthorizeApiKey("bearerAuth", data.token);

              console.log("Token JWT configurado automaticamente no Swagger"
              );
            }
          }

        } catch (error) {

          console.error("Erro ao configurar JWT no Swagger:", error);

        }

        return response;
        
      };})();`,
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerConfig));



const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

Login(app);
ConfigurarListaPessoas(app, db);
Endereco(app, db);
Telefone(app, db);

app.get("/", (req, res) => {
  res.status(200).send("Curso DM Fundatec");
});

export default app;
