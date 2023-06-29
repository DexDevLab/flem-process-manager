import { prisma } from "@/services/database";
import { exceptionHandler } from "@/utils/exceptionHandler";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";

const processosController = {
  get: async (req, res) => {
    try {
      const query = await prisma.processos.findMany({
        where: {
          excluido: false,
        },
        include: {
          Cadastros_Demandantes: {
            select: {
              id: true,
              nome: true,
            },
          },
          Cadastros_Subscritores: {
            select: {
              id: true,
              nome: true,
            },
          },
          Cadastros_Tecnicos: {
            select: {
              id: true,
              nome: true,
            },
          },
          Cadastros_Tipos_Aditivo: {
            select: {
              id: true,
              nome: true,
            },
          },
          Cadastros_Tipos_Atividades: {
            select: {
              id: true,
              nome: true,
            },
          },
          Cadastros_Tipos_Formalizacoes: {
            select: {
              id: true,
              nome: true,
            },
          },
          Cadastros_Tipos_Parecer: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
      return res.status(200).json(query);
    } catch (e) {
      return exceptionHandler(e, res);
    }
  },
  post: async (req, res) => {
    try {
    const {
      dataEntrada,
      protocolo,
      numSD,
      numRC,
      projSetor,
      numProcesso,
      numParecer,
      objeto,
      fornecedor,
      numContrato,
      valor,
      id_Atividade,
      id_Tecnico,
      id_Demandante,
      id_TipoParecer,
      id_Formalizacao,
      id_TipoAditivo,
      id_Subscritor,
    } = req.body;
      const query = await prisma.processos.create({
        data: {
          dataEntrada: DateTime.fromISO(dataEntrada).toISO(),
          protocolo,
          numSD,
          numRC,
          projSetor,
          numProcesso,
          numParecer,
          objeto,
          fornecedor,
          numContrato,
          valor,
          cadastros_Tipos_AtividadesId: id_Atividade,
          cadastros_TecnicosId: id_Tecnico,
          cadastros_DemandantesId: id_Demandante,
          cadastros_Tipos_ParecerId: id_TipoParecer,
          cadastros_Tipos_FormalizacoesId: id_Formalizacao,
          cadastros_Tipos_AditivoId: id_TipoAditivo,
          cadastros_SubscritoresId: id_Subscritor,
        },
      });
      return res.status(200).json(query);
    } catch (e) {
      return exceptionHandler(e, res);
    }
  },
  put: async (req, res) => {
    try{
    const { idProcesso } = req.query;
    const { dataSaidaProcesso, id_Subscritor } = req.body;
      const query = await prisma.processos.update({
        where: {
          id: idProcesso,
        },
        data: {
          dataSaida: isEmpty(dataSaidaProcesso)
            ? undefined
            : DateTime.fromISO(dataSaidaProcesso).toISO(),
          cadastros_SubscritoresId: isEmpty(id_Subscritor)
            ? undefined
            : id_Subscritor,
        },
      });
      return res.status(200).json(query);
    } catch (e) {
      return exceptionHandler(e, res);
    }
  },
};

export { processosController };
