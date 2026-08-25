import jwt from "jsonwebtoken";

export default function Login(app) {
  app.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario !== "ti27" || senha !== "fundatec2026") {
      return res.status(401).json({
        erro: "Usuário ou senha inválidos",
      });
    }

    const token = jwt.sign({ usuario }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  });
}
