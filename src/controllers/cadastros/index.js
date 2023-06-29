import { prisma } from "@/services/database";
import { exceptionHandler } from "@/utils/exceptionHandler";
import { isUndefined } from "lodash";

const cadastrosController = {
  get: async (req, res) => {
    try {
      
    
    const [
      cadastros_Subscritores,
      cadastros_Demandantes,
      cadastros_Tecnicos,
      cadastros_Tipos_Aditivo,
      cadastros_Tipos_Atividades,
      cadastros_Tipos_Formalizacoes,
      cadastros_Tipos_Parecer,
    ] = await prisma.$transaction([
      prisma.cadastros_Subscritores.findMany({
        select: {
          id: true,
          nome: true,
          matricula: true,
        },

        where: {
          excluido: false,
        },
      }),
      prisma.cadastros_Demandantes.findMany({
        select: {
          id: true,
          nome: true,
        },

        where: {
          excluido: false,
        },
      }),
      prisma.cadastros_Tecnicos.findMany({
        select: {
          id: true,
          nome: true,
          matricula: true,
        },

        where: {
          excluido: false,
        },
      }),
      prisma.cadastros_Tipos_Aditivo.findMany({
        select: {
          id: true,
          nome: true,
        },

        where: {
          excluido: false,
        },
      }),
      prisma.cadastros_Tipos_Atividades.findMany({
        select: {
          id: true,
          nome: true,
        },

        where: {
          excluido: false,
        },
      }),
      prisma.cadastros_Tipos_Formalizacoes.findMany({
        select: {
          id: true,
          nome: true,
        },

        where: {
          excluido: false,
        },
      }),
      prisma.cadastros_Tipos_Parecer.findMany({
        select: {
          id: true,
          nome: true,
        },

        where: {
          excluido: false,
        },
      }),
    ]);
    return res.json({
      cadastros_Subscritores,
      cadastros_Demandantes,
      cadastros_Tecnicos,
      cadastros_Tipos_Aditivo,
      cadastros_Tipos_Atividades,
      cadastros_Tipos_Formalizacoes,
      cadastros_Tipos_Parecer,
    });
  } catch (e) {
    return exceptionHandler(e, res);
  }
  },
  post: async (req, res) => {
    try {
    const { tipoCadastro } = req.query;
    const { nome, dadosColaborador } = req.body;
    const data = isUndefined(dadosColaborador)
      ? {
          nome,
        }
      : dadosColaborador;
   
      await prisma[tipoCadastro].create({
        data,
      });
      return res.json({ query: 10, tipoCadastro, nome });
    } catch ({ message, code, meta: { target }, ...error }) {
      if (!isUndefined(code) && code === "P2002") {
        const errorResponse = { message: "", code };
        switch (target) {
          case "dbo.Cadastros_Subscritores":
            errorResponse.message = "Subscritor já existe.";
            break;
          case "dbo.Cadastros_Demandantes":
            errorResponse.message = "Demandante já existe.";
            break;
          case "dbo.Cadastros_Tecnicos":
            errorResponse.message = "Técnico já existe.";
            break;
          case "dbo.Cadastros_Tipos_Aditivo":
            errorResponse.message = "Tipo de Aditivo já existe.";
            break;
          case "dbo.Cadastros_Tipos_Atividades":
            errorResponse.message = "Tipo de Atividade já existe.";
            break;
          case "dbo.Cadastros_Tipos_Formalizacoes":
            errorResponse.message = "Tipo de Formalização já existe.";
            break;
          case "dbo.Cadastros_Tipos_Parecer":
            errorResponse.message = "Tipo de Parecer já existe.";
            break;
          default:
            errorResponse.message =
              "Ocorreu um erro. Por favor, tente novamente.";
            break;
        }
        const e = new Error();
        e.status = 409;
        e.message = errorResponse.message;
        return exceptionHandler(e, res);
      }
      return exceptionHandler(error, res);
    }
  },
};

export { cadastrosController };
