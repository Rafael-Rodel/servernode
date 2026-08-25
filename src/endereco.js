import { Router } from "express";
import autenticarToken from "./autenticacao.js";

export default function Endereco(app, db) {
  const router = Router();

  router.get("/Endereco/:idEndereco", autenticarToken, async (req, res) => {
    try {
      const { idEndereco } = req.params;
      const sql = "SELECT * FROM Endereco WHERE idEndereco = ?";
      const [rows] = await db.query(sql, [idEndereco]);

      if (rows.length === 0) {
        return res.status(404).json({ erro: "Endereço não encontrado" });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro na consulta ao banco de dados" });
    }
  });

  router.get("/ListaEnderecos", autenticarToken, async (req, res) => {
    try {
      const sql = "SELECT * FROM Endereco";
      const [rows] = await db.query(sql);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro na consulta ao banco de dados" });
    }
  });

  router.get("/ListaEnderecos/:idPessoa", autenticarToken, async (req, res) => {
    try {
      const { idPessoa } = req.params;
      const sql = "SELECT * FROM Endereco WHERE idPessoa = ?";
      const [rows] = await db.query(sql, [idPessoa]);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro na consulta ao banco de dados" });
    }
  });

  router.post("/IncluirEndereco", autenticarToken, async (req, res) => {
    try {
      const { Endereco, Cidade, Complemento, Numero, idPessoa } = req.body;

      const sql = `
                INSERT INTO Endereco
                (Endereco, Cidade, Complemento, Numero, idPessoa)
                VALUES (?, ?, ?, ?, ?)
            `;

      const [result] = await db.query(sql, [
        Endereco,
        Cidade,
        Complemento,
        Numero,
        idPessoa,
      ]);

      res.status(201).json({ idEndereco: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        erro: "Erro ao incluir endereço no banco de dados",
      });
    }
  });

  router.delete(
    "/ExcluirEndereco/:idEndereco",
    autenticarToken,
    async (req, res) => {
      try {
        const { idEndereco } = req.params;
        const sql = "DELETE FROM Endereco WHERE idEndereco = ?";
        const [result] = await db.query(sql, [idEndereco]);

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ erro: "Endereço não encontrado - favor verificar" });
        }

        res.status(200).json({ mensagem: "Endereço excluído com sucesso" });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          erro: "Erro ao excluir endereço do banco de dados",
        });
      }
    },
  );

  router.put(
    "/AlterarEndereco/:idEndereco",
    autenticarToken,
    async (req, res) => {
      try {
        const { idEndereco } = req.params;
        const { Endereco, Cidade, Complemento, Numero, idPessoa } = req.body;

        const campos = [];
        const valores = [];

        if (Endereco !== undefined) {
          campos.push("Endereco = ?");
          valores.push(Endereco);
        }
        if (Cidade !== undefined) {
          campos.push("Cidade = ?");
          valores.push(Cidade);
        }
        if (Complemento !== undefined) {
          campos.push("Complemento = ?");
          valores.push(Complemento);
        }
        if (Numero !== undefined) {
          campos.push("Numero = ?");
          valores.push(Numero);
        }
        if (idPessoa !== undefined) {
          campos.push("idPessoa = ?");
          valores.push(idPessoa);
        }

        if (campos.length === 0) {
          return res
            .status(400)
            .json({ erro: "Nenhum campo fornecido para atualização" });
        }

        const sql = `
                UPDATE Endereco
                SET ${campos.join(", ")}
                WHERE idEndereco = ?
            `;

        const [result] = await db.query(sql, [...valores, idEndereco]);

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ erro: "Endereço não encontrado - favor verificar" });
        }

        res.status(200).json({ mensagem: "Endereço alterado com sucesso" });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          erro: "Erro ao alterar endereço no banco de dados",
        });
      }
    },
  );

  app.use("/", router);
}
