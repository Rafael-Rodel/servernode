import app from "./src/app.js";
import "dotenv/config";

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Docs disponíveis em /api-docs`);
});