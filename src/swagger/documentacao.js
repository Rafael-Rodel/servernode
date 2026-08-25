/**
 * @openapi
 * /:
 *   get:
 *     summary: Página inicial da API
 *     description: Retorna uma mensagem indicando que a API está em funcionamento.
 *     tags:
 *       - Teste da API
 *     responses:
 *       200:
 *         description: Mensagem de sucesso.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Curso de DM Fundatec
 */

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autenticação de usuário
 *     description: Valida usuário e senha e retorna um token JWT para acesso aos endpoints protegidos.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - senha
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "ti27"
 *               senha:
 *                 type: string
 *                 example: "fundatec2026"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Usuário ou senha inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @openapi
 * /chat:
 *   post:
 *     summary: Enviar mensagem para o ChatGPT
 *     description: Recebe uma mensagem e retorna a resposta gerada pela IA.
 *     tags:
 *       - ChatGPT
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mensagem
 *             properties:
 *               mensagem:
 *                 type: string
 *                 description: Mensagem enviada para o ChatGPT
 *                 example: "Olá, ChatGPT!"
 *     responses:
 *       200:
 *         description: Resposta gerada pelo ChatGPT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resposta:
 *                   type: string
 *                   example: "Olá! Como posso ajudar você hoje?"
 *       400:
 *         description: Campo mensagem não informado
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno
 */

/**
 * @openapi
 * /ListaPessoas:
 *   get:
 *     summary: Listar pessoas
 *     description: Retorna uma lista de pessoas cadastradas.
 *     tags:
 *       - Pessoa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idPessoa:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: João da Silva
 *                   rg:
 *                     type: string
 *                     example: "123456789"
 *                   cpf:
 *                     type: string
 *                     example: "98765432100"
 *                   dtanascimento:
 *                     type: string
 *                     format: date
 *                     example: "1990-05-20"
 *                   foto:
 *                     type: string
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro na consulta ao banco de dados
 */

/**
 * @openapi
 * /Pessoa/{idPessoa}:
 *   get:
 *     summary: Obter pessoa por ID
 *     description: Retorna os dados de uma pessoa específica.
 *     tags:
 *       - Pessoa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPessoa
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pessoa encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idPessoa:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: João da Silva
 *                 rg:
 *                   type: string
 *                   example: "123456789"
 *                 cpf:
 *                   type: string
 *                   example: "98765432100"
 *                 dtanascimento:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-20"
 *                 foto:
 *                   type: string
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro na consulta ao banco de dados
 */

/**
 * @openapi
 * /Inserir:
 *   post:
 *     summary: Incluir pessoa
 *     description: Cadastra uma nova pessoa no sistema.
 *     tags:
 *       - Pessoa
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - rg
 *               - cpf
 *               - dtanascimento
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               rg:
 *                 type: string
 *                 example: "123456789"
 *               cpf:
 *                 type: string
 *                 example: "98765432100"
 *               dtanascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-20"
 *               foto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pessoa cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao inserir pessoa
 */

/**
 * @openapi
 * /AlterarPessoa/{idPessoa}:
 *   put:
 *     summary: Editar pessoa
 *     description: Atualiza os dados de uma pessoa existente.
 *     tags:
 *       - Pessoa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPessoa
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               rg:
 *                 type: string
 *                 example: "123456789"
 *               cpf:
 *                 type: string
 *                 example: "98765432100"
 *               dtanascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-20"
 *               foto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *       400:
 *         description: Nenhum campo informado para atualização
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro ao atualizar pessoa
 */

/**
 * @openapi
 * /DeletarPessoas/{idPessoa}:
 *   delete:
 *     summary: Remover pessoa
 *     description: Exclui uma pessoa do sistema.
 *     tags:
 *       - Pessoa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPessoa
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pessoa removida com sucesso
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro ao remover pessoa
 */

/**
 * @openapi
 * /Endereco/{idEndereco}:
 *   get:
 *     summary: Busca um endereço pelo ID
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idEndereco
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /ListaEnderecos:
 *   get:
 *     summary: Lista todos os endereços cadastrados
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /ListaEnderecos/{idPessoa}:
 *   get:
 *     summary: Lista os endereços de uma pessoa
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPessoa
 *         required: true
 *         description: ID da pessoa
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /IncluirEndereco:
 *   post:
 *     summary: Cadastra um novo endereço
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Endereco
 *               - Cidade
 *               - Numero
 *               - idPessoa
 *             properties:
 *               Endereco:
 *                 type: string
 *                 example: Rua das Flores
 *               Cidade:
 *                 type: string
 *                 example: Porto Alegre
 *               Complemento:
 *                 type: string
 *                 example: Apartamento 101
 *               Numero:
 *                 type: string
 *                 example: "123"
 *               idPessoa:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Endereço cadastrado com sucesso
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /AlterarEndereco/{idEndereco}:
 *   put:
 *     summary: Altera os dados de um endereço pelo ID
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idEndereco
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Endereco:
 *                 type: string
 *                 example: Rua das Flores
 *               Cidade:
 *                 type: string
 *                 example: Porto Alegre
 *               Complemento:
 *                 type: string
 *                 example: Apartamento 101
 *               Numero:
 *                 type: string
 *                 example: "123"
 *               idPessoa:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Endereço alterado com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro ao alterar endereço no banco de dados
 */

/**
 * @openapi
 * /ExcluirEndereco/{idEndereco}:
 *   delete:
 *     summary: Exclui um endereço pelo ID
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idEndereco
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Endereço excluído com sucesso
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro na exclusão do endereço no banco de dados
 */

/**
 * @openapi
 * /ListaTelefones:
 *   get:
 *     summary: Lista todos os telefones
 *     description: Retorna todos os telefones cadastrados no banco de dados.
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de telefones retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTelefone:
 *                     type: integer
 *                     example: 1
 *                   Telefone:
 *                     type: string
 *                     example: "999887766"
 *                   DDD:
 *                     type: string
 *                     example: "51"
 *                   idTipoTelefone:
 *                     type: integer
 *                     example: 1
 *                   idPessoa:
 *                     type: integer
 *                     nullable: true
 *                     example: 1
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao consultar telefones
 */

/**
 * @openapi
 * /ListaTelefones/{idPessoa}:
 *   get:
 *     summary: Lista os telefones de uma pessoa
 *     description: Retorna todos os telefones vinculados a uma pessoa através do idPessoa.
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPessoa
 *         required: true
 *         description: ID da pessoa que terá os telefones listados
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de telefones da pessoa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTelefone:
 *                     type: integer
 *                     example: 1
 *                   Telefone:
 *                     type: string
 *                     example: "999887766"
 *                   DDD:
 *                     type: string
 *                     example: "51"
 *                   idTipoTelefone:
 *                     type: integer
 *                     example: 1
 *                   idPessoa:
 *                     type: integer
 *                     example: 1
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao consultar telefones da pessoa
 */

/**
 * @openapi
 * /Telefone/{idTelefone}:
 *   get:
 *     summary: Busca um telefone por ID
 *     description: Retorna os dados de um telefone específico através do idTelefone.
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTelefone
 *         required: true
 *         description: ID do telefone
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Telefone encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idTelefone:
 *                   type: integer
 *                   example: 1
 *                 Telefone:
 *                   type: string
 *                   example: "999887766"
 *                 DDD:
 *                   type: string
 *                   example: "51"
 *                 idTipoTelefone:
 *                   type: integer
 *                   example: 1
 *                 idPessoa:
 *                   type: integer
 *                   nullable: true
 *                   example: 1
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Telefone não encontrado
 *       500:
 *         description: Erro ao consultar telefone
 */

/**
 * @openapi
 * /IncluirTelefone:
 *   post:
 *     summary: Cadastra um novo telefone
 *     description: Cadastra um telefone e o vincula a uma pessoa.
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Telefone
 *               - DDD
 *               - idTipoTelefone
 *               - idPessoa
 *             properties:
 *               Telefone:
 *                 type: string
 *                 example: "999887766"
 *               DDD:
 *                 type: string
 *                 example: "51"
 *               idTipoTelefone:
 *                 type: integer
 *                 example: 1
 *               idPessoa:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Telefone cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Telefone cadastrado com sucesso
 *                 idTelefone:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Campos obrigatórios não informados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: Telefone, DDD, idTipoTelefone e idPessoa são obrigatórios
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao incluir telefone no banco de dados
 */

/**
 * @openapi
 * /AlterarTelefone/{idTelefone}:
 *   put:
 *     summary: Altera um telefone
 *     description: Atualiza um ou mais campos de um telefone existente.
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTelefone
 *         required: true
 *         description: ID do telefone que será alterado
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Telefone:
 *                 type: string
 *                 example: "988776655"
 *               DDD:
 *                 type: string
 *                 example: "51"
 *               idTipoTelefone:
 *                 type: integer
 *                 example: 2
 *               idPessoa:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Telefone atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Telefone atualizado com sucesso
 *       400:
 *         description: Nenhum campo informado para atualização
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: Nenhum campo informado para atualização
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Telefone não encontrado
 *       500:
 *         description: Erro ao atualizar telefone
 */

/**
 * @openapi
 * /ExcluirTelefone/{idTelefone}:
 *   delete:
 *     summary: Exclui um telefone
 *     description: Remove um telefone cadastrado através do seu idTelefone.
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTelefone
 *         required: true
 *         description: ID do telefone que será excluído
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Telefone excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Telefone excluído com sucesso
 *       401:
 *         description: Token não informado
 *       403:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Telefone não encontrado
 *       500:
 *         description: Erro ao excluir telefone
 */
