<div align="center">

<img src="https://frtechdev.github.io/flem-process-manager/resources/thumb.png" height='450px' width='750px' alt="Print">

</div>

<h1 align="center">FLEM Process Manager</h1>
<p align=center><i align="center">Aplicação utilizada pelo setor jurídico para organização de processos judiciais FLEM</i></p>

<br>

<div align="center">

<a href="https://reactjs.org"><img src="https://img.shields.io/badge/react-black?logo=react&logoColor=white" height="22" alt="React"/></a>
<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white" height="22" alt="NextJS"/></a>
<a href="https://chakra-ui.com"><img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?logo=chakraui&logoColor=white" height="22" alt="ChakraUI"/></a>
<a href="https://www.prisma.io"><img src="https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white" height="22" alt="PrismaIO"/></a>
<a href="https://www.microsoft.com/pt-br/sql-server/sql-server-2019"><img src="https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?logo=microsoft%20sql%20server&logoColor=white" height="22" alt="MSSQLServer"/></a>

<a href=""><img src="https://img.shields.io/badge/maintenance-actively--developed-brightgreen.svg" height="22" alt="Maintenance-actively-developed"/></a>
<a href=""><img src="https://img.shields.io/github/last-commit/frtechdev/flem-process-manager" height="22" alt="LastCommit"></a>
<a href=""><img src="https://snyk.io/test/github/frtechdev/flem-process-manager/badge.svg" height="22" alt="Snyk"/></a>

<a href=""><img src="https://img.shields.io/github/repo-size/frtechdev/flem-process-manager" height="22" alt="RepoSize"/></a>
<a href=""><img src="https://img.shields.io/github/languages/code-size/frtechdev/flem-process-manager" height="22" alt="CodeSize"/></a>
<a href=""><img src="https://img.shields.io/github/contributors/frtechdev/flem-process-manager" height="22" alt="Contributors"></a>

<a href=""><img src="https://img.shields.io/github/forks/frtechdev/flem-process-manager" height="22" alt="Fork"></a>
<a href=""><img src="https://img.shields.io/github/release/frtechdev/flem-process-manager.svg" height="22" alt="LatestRelease"></a>
<a href="https://github.com/frtechdev/flem-process-manager/blob/main/LICENSE"><img src="https://img.shields.io/github/license/frtechdev/flem-process-manager" height="22" alt="License"></a>

|| [Conteúdo](#section-conteudo) || [Características](#section-caracteristicas) || [Stack](#section-stack) || [Documentação](#section-documentacao) || [Instruções](#section-instrucoes) ||

|| [Variáveis de Ambiente](#section-vars) || [Notas de versão](#section-changelog) || [Autores](#section-autores) || [Contato](#section-contato) || [Licença](#section-licenca) ||

</div>

<hr>

<a name="section-conteudo">

## Conteúdo

</a>

<br>

Esta aplicação tem a função de organizar os processos jurídicos da FLEM, administrado por setor competente, o qual necessita organizar, definir e manter informações sobre processos ativos e inativos. Essa aplicação simples cadastra e informa dados sobre processos jurídicos, as pessoas envolvidas e os assinantes (subscritores) dos processos.

<hr>

<a name="section-caracteristicas">

## Características

</a>

<br>

- Interface simples e compatível com o sistema de design utilizado por outras aplicações FLEM

<hr>

<a name="section-stack">

## Stack

</a>

<br>

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Linguagens de Marcação e Estilo:** [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [SASS](https://sass-lang.com/documentation)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Design System:** [Chakra UI](https://chakra-ui.com/docs/getting-started)
- **Biblioteca de Conexão ODBC / ORM:** [Prisma.io](https://www.prisma.io)
- **Banco de Dados:** [SQL](https://pt.wikipedia.org/wiki/SQL)
- **Gerenciador de Dependências:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/frtechdev/flem-process-manager/blob/main/package.json).

<hr>

<a name="section-documentacao">

## Documentação

</a>

<br>

- [Manual do Usuário](https://frtechdev.github.io/flem-process-manager/resources/process_manager_manual_do_usuario.pdf)

- [Manual de Testes](https://frtechdev.github.io/flem-process-manager/resources/process_manager_manual_de_testes.pdf)

- [Checklist de Validação de Testes](https://frtechdev.github.io/flem-process-manager/resources/process_manager_checklist_de_validacao.xlsx)

Documentação adicional pode ser encontrada [aqui](https://frtechdev.github.io/flem-process-manager/).

<hr>

<a name="section-instrucoes">

## Instruções

</a>

<br>

### Utilizando o repositório como projeto

</a>

1 - Faça um git clone ou o download do repositório, da forma que preferir

```bash

git clone https://github.com/frtechdev/flem-process-manager.git

```

2 - Instale um gerenciador de pacotes (preferencialmente yarn) utilizando um terminal no diretório raiz do repositório clonado

`yarn` ou `npm install`

3 - Execute a aplicação no terminal

`yarn dev` ou `npm run dev`

### Implantando o projeto

</a>

#### Por um repositório clonado

**Lembre-se de executar `yarn build` ANTES de criar seu container com base no repositório local.**

Para criar a imagem, utilize o `docker build` referenciando o arquivo local do [Dockerfile](https://github.com/frtechdev/flem-process-manager/blob/main/Dockerfile):

```bash
docker build --env-file .env -f Dockerfile .
```

#### Diretamente do repositório remoto

Você pode utilizar o `docker build` referenciando diretamente o repositório:

```bash
docker build https://github.com/frtechdev/flem-process-manager.git#main
```

Alternativamente, pode usar o comando detalhado para alterar diretamente configurações como porta e nome do repositório:

```bash
docker run -p X:3000 --env-file .env -e github='https://github.com/frtechdev/flem-process-manager.git' -it frtechdev/flem-process-manager
```

**Lembre-se de criar um arquivo `.env` para definir as variáveis de ambiente utilizadas na imagem, ou especificar as variáveis utilizadas uma a uma na linha de comando acima.**

Onde "X" é uma porta externa de sua escolha. Por padrão, a porta interna é 3000.
Para alterar a porta interna, altere a linha `ENV PORT` do [Dockerfile](https://github.com/frtechdev/flem-process-manager/blob/main/Dockerfile).

Para mais informações, visite a [Documentação do Docker](https://docs.docker.com).

</a>

<hr>

<a name="section-vars">

### Variáveis de Ambiente

</a>

<br>

| Variável      | Uso   |
|---------------|-------|
|`NEXT_PUBLIC_API_BD_DOMINIO` | URL da API de conexão com o BD da Domínio. | |
|`DATABASE_URL` | Define o endereço do Servidor de BD e credenciais para acesso, de acordo com as especificações da biblioteca [Prisma.io](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-sqlserver)| |
|`NEXTAUTH_SECRET` | Hash JWT para criptografar o token de conexão (preferencialmente um hash acima de 32 caracteres). | |
|`NEXTAUTH_URL` | Endereço externo da aplicação. (Por exemplo: `http://processmanager.flem.org.br`) | |
|`NEXTAUTH_URL_INTERNAL` | Endereço interno da aplicação. (Por exemplo: `http://localhost:3000`) | |

<hr>

<a name="section-changelog">

## Notas de versão

</a>

<br>

### v0.1.0-230628

- Início da fase QA:
  - Elaboração das etapas principais dos processos da aplicação
  - Validação de entradas e cadastros conforme solicitado e definido nas Regras de Negócio
  - Elaboração inicial da documentação básica

### Initial Commit

- Initial Commit

<hr>

<a name="section-autores">

## Autores

</a>

<br>

<a href="https://github.com/frtechdev/flem-process-manager/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=frtechdev/flem-process-manager" />
</a>

<hr>

<a name="section-contato">

## Contato

</a>

<br>

Se você gostou deste projeto, dê uma <a href="https://github.com/frtechdev/flem-process-manager" data-icon="octicon-star" aria-label="Star frtechdev/flem-process-manager on GitHub">estrela</a>. <br>
Para contato, envie um email a: <a href="mailto:devops@frtechnologies.com.br">devops@frtechnologies.com.br</a>

<hr>

<a name="section-licenca">

## Licença

</a>

Licenciado sob a [MIT License](https://github.com/frtechdev/flem-process-manager/blob/main/LICENSE).
