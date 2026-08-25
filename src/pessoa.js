import { Router } from "express";
import autenticarToken from "./autenticacao.js";

export default function ConfigurarListaPessoas(app, db) {
  const router = Router();

  router.get("/ListaPessoas", autenticarToken, async (req, res) => {
    try {
      const sql = "SELECT * FROM Pessoa";
      const [rows] = await db.query(sql);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro na consulta ao banco" });
    }
  });

  router.get("/Pessoa/:idPessoa", autenticarToken, async (req, res) => {
    try {
      const { idPessoa } = req.params;
      const sql = "SELECT * FROM Pessoa WHERE idPessoa = ?";
      const [rows] = await db.query(sql, [idPessoa]);

      if (rows.length === 0) {
        return res.status(404).json({ erro: "Pessoa não encontrada" });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro na consulta ao banco" });
    }
  });

  router.post("/Inserir", autenticarToken, async (req, res) => {
    try {
      const { nome, rg, cpf, dtanascimento, foto } = req.body;

      const sql = `
                INSERT INTO Pessoa (nome, rg, cpf, dtanascimento, foto)
                VALUES (?, ?, ?, ?, ?)
            `;

      const [result] = await db.query(sql, [
        nome,
        rg,
        cpf,
        dtanascimento,
        foto,
      ]);

      res.status(201).json({
        mensagem: "Pessoa cadastrada com sucesso",
        idPessoa: result.insertId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao inserir pessoa" });
    }
  });

  router.put("/AlterarPessoa/:idPessoa", autenticarToken, async (req, res) => {
    try {
      const { idPessoa } = req.params;
      const { nome, rg, cpf, dtanascimento, foto } = req.body;

      const campos = [];
      const valores = [];

      if (nome !== undefined) {
        campos.push("nome = ?");
        valores.push(nome);
      }

      if (rg !== undefined) {
        campos.push("rg = ?");
        valores.push(rg);
      }

      if (cpf !== undefined) {
        campos.push("cpf = ?");
        valores.push(cpf);
      }

      if (dtanascimento !== undefined) {
        campos.push("dtanascimento = ?");
        valores.push(dtanascimento);
      }

      if (foto !== undefined) {
        campos.push("foto = ?");
        valores.push(foto);
      }

      if (campos.length === 0) {
        return res.status(400).json({
          erro: "Nenhum campo informado para atualização",
        });
      }

      const sql = `UPDATE Pessoa
                        SET ${campos.join(", ")}
                        WHERE idPessoa = ?`;

      valores.push(idPessoa);

      const [result] = await db.query(sql, valores);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          erro: "Pessoa não encontrada",
        });
      }

      res.status(200).json({
        mensagem: "Pessoa atualizada com sucesso",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Erro ao atualizar pessoa",
      });
    }
  });

  router.delete(
    "/DeletarPessoas/:idPessoa",
    autenticarToken,
    async (req, res) => {
      try {
        const { idPessoa } = req.params;

        const sql = `DELETE FROM Pessoa WHERE idPessoa = ?`;
        const [result] = await db.query(sql, [idPessoa]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ erro: "Pessoa não encontrada" });
        }

        res.status(200).json({ mensagem: "Pessoa removida com sucesso" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover pessoa" });
      }
    },
  );

  app.use("/", router);
}
