import jwt from "jsonwebtoken";
import autenticarToken from "./autenticacao.js";

export default function Chat(app) {
  app.post("/chat", autenticarToken, async (req, res) => {
    try {
      const { mensagem } = req.body;

      if (!mensagem) {
        return res.status(400).json({
          erro: "Campo 'mensagem' é obrigatório",
        });
      }

      const resposta = await client.responses.create({
        model: "gpt-4o",
        input: mensagem,
      });

      res.json({ resposta: resposta.output_text });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        erro: "Erro ao acessar o ChatGPT",
      });
    }
  });
}
