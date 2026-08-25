import { Router } from "express";
import autenticarToken from "./autenticacao.js";

export default function Telefone(app, db) {
  const router = Router();

  router.get("/ListaTelefones", autenticarToken, async (req, res) => {
    try {
      const sql = `
                SELECT
                    idTelefone,
                    Telefone,
                    idTipoTelefone,
                    idPessoa
                FROM Telefone
                ORDER BY idTelefone
            `;

      const [rows] = await db.query(sql);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao consultar telefones",
      });
    }
  });

  router.get("/ListaTelefones/:idPessoa", autenticarToken, async (req, res) => {
    try {
      const { idPessoa } = req.params;

      const sql = `
                SELECT
                    idTelefone,
                    Telefone,
                    idTipoTelefone,
                    idPessoa
                FROM Telefone
                WHERE idPessoa = ?
                ORDER BY idTelefone
            `;

      const [rows] = await db.query(sql, [idPessoa]);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao consultar telefones da pessoa",
      });
    }
  });

  router.get("/Telefone/:idTelefone", autenticarToken, async (req, res) => {
    try {
      const { idTelefone } = req.params;

      const sql = `
                SELECT
                    idTelefone,
                    Telefone,
                    idTipoTelefone,
                    idPessoa
                FROM Telefone
                WHERE idTelefone = ?
            `;

      const [rows] = await db.query(sql, [idTelefone]);

      if (rows.length === 0) {
        return res.status(404).json({
          erro: "Telefone não encontrado",
        });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao consultar telefone",
      });
    }
  });

  router.post("/IncluirTelefone", autenticarToken, async (req, res) => {
    try {
      const { Telefone, idTipoTelefone, idPessoa } = req.body;

if (!Telefone || !idTipoTelefone || !idPessoa) {
  return res.status(400).json({
    erro: "Telefone, idTipoTelefone e idPessoa são obrigatórios",
  });
}

      const sql = `
                INSERT INTO Telefone
                (
                    Telefone,
                    idTipoTelefone,
                    idPessoa
                )
                VALUES (?, ?, ?)
            `;

      const [result] = await db.query(sql, [
        Telefone,
        idTipoTelefone,
        idPessoa,
      ]);

      res.status(201).json({
        mensagem: "Telefone cadastrado com sucesso",
        idTelefone: result.insertId,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        erro: "Erro ao incluir telefone no banco de dados",
      });
    }
  });

  router.put(
    "/AlterarTelefone/:idTelefone",
    autenticarToken,
    async (req, res) => {
      try {
        const { idTelefone } = req.params;

        const { Telefone, idTipoTelefone, idPessoa } = req.body;

        const campos = [];
        const valores = [];

        if (Telefone !== undefined) {
          campos.push("Telefone = ?");
          valores.push(Telefone);
        }

        if (idTipoTelefone !== undefined) {
          campos.push("idTipoTelefone = ?");
          valores.push(idTipoTelefone);
        }

        if (idPessoa !== undefined) {
          campos.push("idPessoa = ?");
          valores.push(idPessoa);
        }

        if (campos.length === 0) {
          return res.status(400).json({
            erro: "Nenhum campo informado para atualização",
          });
        }

        const sql = `
                UPDATE Telefone
                SET ${campos.join(", ")}
                WHERE idTelefone = ?
            `;

        valores.push(idTelefone);

        const [result] = await db.query(sql, valores);

        if (result.affectedRows === 0) {
          return res.status(404).json({
            erro: "Telefone não encontrado",
          });
        }

        res.status(200).json({
          mensagem: "Telefone atualizado com sucesso",
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          erro: "Erro ao atualizar telefone",
        });
      }
    },
  );

  router.delete(
    "/ExcluirTelefone/:idTelefone",
    autenticarToken,
    async (req, res) => {
      try {
        const { idTelefone } = req.params;

        const sql = `
                DELETE FROM Telefone
                WHERE idTelefone = ?
            `;

        const [result] = await db.query(sql, [idTelefone]);

        if (result.affectedRows === 0) {
          return res.status(404).json({
            erro: "Telefone não encontrado",
          });
        }

        res.status(200).json({
          mensagem: "Telefone excluído com sucesso",
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          erro: "Erro ao excluir telefone",
        });
      }
    },
  );

  app.use("/", router);
}
