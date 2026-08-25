import { Router } from "express";
import autenticarToken from "./autenticacao.js";

export default function Telefone(app, db) {
  const routes = Router();

  routes.get("/ListaTelefones", autenticarToken, async (req, res) => {
    try {
      const [telefones] = await db.query(`
        SELECT idTelefone, Telefone, DDD, idTipoTelefone, idPessoa
        FROM Telefone
        ORDER BY idTelefone
      `);

      return res.status(200).json(telefones);
    } catch (err) {
      console.error("Erro ao buscar telefones:", err);

      return res.status(500).json({
        erro: "Erro ao consultar telefones",
      });
    }
  });

  routes.get("/ListaTelefones/:idPessoa", autenticarToken, async (req, res) => {
    try {
      const pessoaId = req.params.idPessoa;

      const [telefones] = await db.query(
        `
          SELECT idTelefone, Telefone, DDD, idTipoTelefone, idPessoa
          FROM Telefone
          WHERE idPessoa = ?
          ORDER BY idTelefone
        `,
        [pessoaId]
      );

      return res.status(200).json(telefones);
    } catch (err) {
      console.error("Erro ao buscar telefones da pessoa:", err);

      return res.status(500).json({
        erro: "Erro ao consultar telefones da pessoa",
      });
    }
  });

  routes.get("/Telefone/:idTelefone", autenticarToken, async (req, res) => {
    try {
      const telefoneId = req.params.idTelefone;

      const [resultado] = await db.query(
        `
          SELECT idTelefone, Telefone, DDD, idTipoTelefone, idPessoa
          FROM Telefone
          WHERE idTelefone = ?
        `,
        [telefoneId]
      );

      if (!resultado.length) {
        return res.status(404).json({
          erro: "Telefone não encontrado",
        });
      }

      return res.status(200).json(resultado[0]);
    } catch (err) {
      console.error("Erro ao buscar telefone:", err);

      return res.status(500).json({
        erro: "Erro ao consultar telefone",
      });
    }
  });

  routes.post("/IncluirTelefone", autenticarToken, async (req, res) => {
    try {
      const dados = req.body;

      if (
        !dados.Telefone ||
        !dados.DDD ||
        !dados.idTipoTelefone ||
        !dados.idPessoa
      ) {
        return res.status(400).json({
          erro: "Telefone, DDD, idTipoTelefone e idPessoa são obrigatórios",
        });
      }

      const [resultado] = await db.query(
        `
          INSERT INTO Telefone (
            Telefone,
            DDD,
            idTipoTelefone,
            idPessoa
          )
          VALUES (?, ?, ?, ?)
        `,
        [
          dados.Telefone,
          dados.DDD,
          dados.idTipoTelefone,
          dados.idPessoa,
        ]
      );

      return res.status(201).json({
        mensagem: "Telefone cadastrado com sucesso",
        idTelefone: resultado.insertId,
      });
    } catch (err) {
      console.error("Erro ao cadastrar telefone:", err);

      return res.status(500).json({
        erro: "Erro ao incluir telefone no banco de dados",
      });
    }
  });

  routes.put(
    "/AlterarTelefone/:idTelefone",
    autenticarToken,
    async (req, res) => {
      try {
        const telefoneId = req.params.idTelefone;
        const dados = req.body;

        const alteracoes = [];
        const parametros = [];

        const atualizar = (campo, valor) => {
          if (valor !== undefined) {
            alteracoes.push(`${campo} = ?`);
            parametros.push(valor);
          }
        };

        atualizar("Telefone", dados.Telefone);
        atualizar("DDD", dados.DDD);
        atualizar("idTipoTelefone", dados.idTipoTelefone);
        atualizar("idPessoa", dados.idPessoa);

        if (!alteracoes.length) {
          return res.status(400).json({
            erro: "Nenhum campo informado para atualização",
          });
        }

        parametros.push(telefoneId);

        const [resultado] = await db.query(
          `
            UPDATE Telefone
            SET ${alteracoes.join(", ")}
            WHERE idTelefone = ?
          `,
          parametros
        );

        if (!resultado.affectedRows) {
          return res.status(404).json({
            erro: "Telefone não encontrado",
          });
        }

        return res.status(200).json({
          mensagem: "Telefone atualizado com sucesso",
        });
      } catch (err) {
        console.error("Erro ao alterar telefone:", err);

        return res.status(500).json({
          erro: "Erro ao atualizar telefone",
        });
      }
    }
  );

  routes.delete(
    "/ExcluirTelefone/:idTelefone",
    autenticarToken,
    async (req, res) => {
      try {
        const telefoneId = req.params.idTelefone;

        const [resultado] = await db.query(
          `
            DELETE FROM Telefone
            WHERE idTelefone = ?
          `,
          [telefoneId]
        );

        if (!resultado.affectedRows) {
          return res.status(404).json({
            erro: "Telefone não encontrado",
          });
        }

        return res.status(200).json({
          mensagem: "Telefone excluído com sucesso",
        });
      } catch (err) {
        console.error("Erro ao excluir telefone:", err);

        return res.status(500).json({
          erro: "Erro ao excluir telefone",
        });
      }
    }
  );

  app.use("/", routes);
}