import { FormMaker } from "@/components/Form";
import { Overlay } from "@/components/Overlay";
import { Table } from "@/components/Table";
import { useCustomForm } from "@/hooks";
import { backendApi, bdRhService } from "@/services";
import { exceptionHandler } from "@/utils/exceptionHandler";
import { maskCapitalize } from "@/utils/maskCapitalize";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  HStack,
  Heading,
  Icon,
  ScaleFade,
  Stack,
  Text,
  useBoolean,
  useBreakpointValue,
  useDisclosure,
  useToast,
  useToken,
} from "@chakra-ui/react";
import { isEmpty, isNumber } from "lodash";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiInfo, FiPlus } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

const MenuIconButton = dynamic(
  () =>
    import("@/components/Menus/MenuIconButton").then(
      (res) => res.MenuIconButton
    ),
  { ssr: false }
);

export default function Home() {
  const formCadastroItem = useCustomForm();
  const showTable = useDisclosure();
  const [bdRhServiceLoading, setBdRhServiceLoading] = useBoolean();
  const [bdRhServiceOptions, setBdRhServiceOptions] = useState([]);
  const [overlayConfigIndex, setOverlayConfigIndex] = useState(null);
  const [tableData, setTableData] = useState(null);
  const toastPosition = useBreakpointValue({ base: "bottom", md: "top-right" });
  const toast = useToast({
    duration: 5000,
    isClosable: false,
    status: "success",
  });

  let timer = undefined;

  const onSubmitForm = useCallback(
    async (rawFormData, e) => {
      formCadastroItem.setLoading();
      e.preventDefault();
      try {
        const { route, ...formData } = rawFormData;
        await backendApi.post(`/cadastros/${route}`, formData);
        toast({
          title: "Cadastro efetuado com sucesso",
          position: toastPosition,
        });
        formCadastroItem.closeOverlay();
      } catch (error) {
        const exception = exceptionHandler(error);
        if (exception.code == 409) {
          const title = error.response.data.toString().replace("Error: ", "");
          exception.title = title;
          exception.description = "";
          exception.duration = 5000;
        }
        toast(exception);
        // } catch ({
        //   response: {
        //     status,
        //     data: { code, message },
        //   },
        // }) {
        //   console.log(message);
        //   if (!isUndefined(code) && code === "P2002")
        //     toast({
        //       title: message,
        //       status: "error",
        //       position: toastPosition,
        //     });
      } finally {
        formCadastroItem.setLoaded();
        return null;
      }
    },
    [toastPosition]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
    ],
    []
  );

  const obterColaboradoresRhApi = useCallback(async (nome) => {
    try {
      const {
        data: { query },
      } = await bdRhService.get(`/funcionarios`, {
        params: {
          ativo: true,
          nome,
        },
      });
      setBdRhServiceLoading.off();
      setBdRhServiceOptions(
        isEmpty(query)
          ? []
          : query.map(({ nome, matriculaDominio }) => ({
              value: {
                nome: maskCapitalize(nome),
                matricula: matriculaDominio,
              },
              label: `${matriculaDominio} - ${maskCapitalize(nome)}`,
            }))
      );
      return null;
    } catch (error) {
      toast(exceptionHandler(error));
    }
  }, []);

  const getTableData = useCallback(async () => {
    try {
      showTable.onClose();
      const { data } = await backendApi.get("/cadastros");
      setTableData(data);
      setTimeout(showTable.onOpen, 100);
    } catch (error) {
      toast(exceptionHandler(error));
    }
  }, []);

  const cardsData = useMemo(
    () => [
      {
        id: "aditivo",
        cardLabel: "Tipos de Aditivos",
        addLabel: "Adicionar Tipo de Aditivo",
        tableData: isEmpty(tableData) ? [] : tableData.cadastros_Tipos_Aditivo,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Tipos_Aditivo",
          },
          {
            id: "nome",
            label: "Nome",
            required: "Obrigatório",
          },
        ],
      },
      {
        id: "atividade",
        cardLabel: "Tipos de Atividades",
        addLabel: "Adicionar Tipo de Atividade",
        tableData: isEmpty(tableData)
          ? []
          : tableData.cadastros_Tipos_Atividades,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Tipos_Atividades",
          },
          {
            id: "nome",
            label: "Nome",
            required: true,
          },
        ],
      },
      {
        id: "formalizacao",
        cardLabel: "Tipos de Formalizações",
        addLabel: "Adicionar Tipo de Formalização",
        tableData: isEmpty(tableData)
          ? []
          : tableData.cadastros_Tipos_Formalizacoes,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Tipos_Formalizacoes",
          },
          {
            id: "nome",
            label: "Nome",
            required: true,
          },
        ],
      },
      {
        id: "parecer",
        cardLabel: "Tipos de Parecer",
        addLabel: "Adicionar Tipo de Parecer",
        tableData: isEmpty(tableData) ? [] : tableData.cadastros_Tipos_Parecer,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Tipos_Parecer",
          },
          {
            id: "nome",
            label: "Nome",
            required: true,
          },
        ],
      },
      {
        id: "tecnicos",
        cardLabel: "Técnicos",
        addLabel: "Adicionar Técnico",
        tableData: isEmpty(tableData) ? [] : tableData.cadastros_Tecnicos,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Tecnicos",
          },
          {
            id: "dadosColaborador",
            label: "Nome",
            type: "select",
            required: true,
            onChange: (e) => {
              setBdRhServiceOptions([]);
              if (e?.target?.value) {
                const {
                  target: { value },
                } = e;
                setBdRhServiceLoading.on();
                formCadastroItem.control.setValue("nome", "");
                clearTimeout(timer);
                timer =
                  bdRhServiceLoading &&
                  setTimeout(obterColaboradoresRhApi, 1500, value);
              }
            },
            isLoading: bdRhServiceLoading,
            options: bdRhServiceOptions,
          },
        ],
      },
      {
        id: "subscritores",
        cardLabel: "Subscritores",
        addLabel: "Adicionar Subscritor",
        tableData: isEmpty(tableData) ? [] : tableData.cadastros_Subscritores,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Subscritores",
          },
          {
            id: "dadosColaborador",
            label: "Nome",
            type: "select",
            required: true,
            onChange: (e) => {
              setBdRhServiceOptions([]);
              if (e?.target?.value) {
                const {
                  target: { value },
                } = e;
                setBdRhServiceLoading.on();
                formCadastroItem.control.setValue("dadosColaborador", "");
                clearTimeout(timer);
                timer =
                  bdRhServiceLoading &&
                  setTimeout(obterColaboradoresRhApi, 1500, value);
              }
            },
            isLoading: bdRhServiceLoading,
            options: bdRhServiceOptions,
          },
        ],
      },
      {
        id: "demandantes",
        cardLabel: "Demandantes",
        addLabel: "Adicionar Demandante",
        tableData: isEmpty(tableData) ? [] : tableData.cadastros_Demandantes,
        overlayInputs: [
          {
            id: "route",
            type: "hidden",
            defaultValue: "cadastros_Demandantes",
          },
          {
            id: "nome",
            label: "Nome",
            required: true,
          },
        ],
      },
    ],
    [bdRhServiceLoading, tableData]
  );

  const callOverlayAction = (overlayIndex) => {
    setOverlayConfigIndex(overlayIndex);
    formCadastroItem.openOverlay();
  };

  const clearOverlayConfigData = useMemo(() => {
    formCadastroItem.control.reset();
    setOverlayConfigIndex(null);
  }, []);

  useEffect(() => {
    if (!formCadastroItem.overlayIsOpen) getTableData();
  }, [formCadastroItem.overlayIsOpen]);

  return (
    <>
      <Head>
        <title>Process Manager - Cadastros</title>
        <meta
          name="description"
          content="FLEM Process Manager"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={4}>
        <HStack
          display={{ base: "none", md: "block" }}
          justifyContent="space-between"
        >
          <Heading size="lg" my={0.5}>
            Process Manager
          </Heading>
        </HStack>
        <Flex justifyContent="space-between">
          <Heading size="md">Cadastros</Heading>
          <Center as={ScaleFade} in={!showTable.isOpen}>
            <PulseLoader color={useToken("colors", "primary.500")} />
          </Center>
        </Flex>
        <Stack
          opacity={showTable.isOpen ? 1 : 0.2}
          transition="all .25s ease-in-out"
          spacing={4}
        >
          {cardsData.map((cardData, idx) => (
            <Stack
              key={`card-${idx}-${cardData.label}`}
              bg="white"
              rounded="lg"
              shadow="lg"
              spacing={2}
              py={2}
            >
              <HStack justifyContent="space-between" pt={2} px={4}>
                <Heading size="sm" ms={1}>
                  {cardData.cardLabel}
                </Heading>
                <Button
                  leftIcon={<Icon as={FiPlus} fontSize="xl" />}
                  colorScheme="primary"
                  onClick={() => callOverlayAction(idx)}
                  isDisabled={!showTable.isOpen}
                >
                  Adicionar
                </Button>
              </HStack>
              <Box>
                <Collapse in={showTable.isOpen && !isEmpty(cardData.tableData)}>
                  <Table data={cardData.tableData} columns={columns} />
                </Collapse>

                <Collapse in={showTable.isOpen && isEmpty(cardData.tableData)}>
                  <HStack py={2} px={4}>
                    <Icon as={FiInfo} fontSize="xl" color="primary.500" />
                    <Text size="sm">Nenhum dado encontrado</Text>
                  </HStack>
                </Collapse>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Acicionar Processo Overlay */}
      <Overlay
        onClose={formCadastroItem.closeOverlay}
        onCloseComplete={clearOverlayConfigData}
        isOpen={formCadastroItem.overlayIsOpen}
        header={
          isNumber(overlayConfigIndex) && cardsData[overlayConfigIndex].addLabel
        }
        closeButton
        size="sm"
      >
        <Stack
          as="form"
          spacing={0}
          onSubmit={formCadastroItem.handleSubmit(onSubmitForm)}
        >
          <FormMaker formControl={formCadastroItem.control}>
            {isNumber(overlayConfigIndex) &&
              cardsData.find((obj, idx) => idx === overlayConfigIndex)
                .overlayInputs}
          </FormMaker>
          <HStack justifyContent="flex-end" pt={4}>
            <Button
              type="submit"
              colorScheme="primary"
              isDisabled={!formCadastroItem.validation}
              isLoading={formCadastroItem.isLoading}
              loadingText="Aguarde..."
            >
              Cadastrar
            </Button>
          </HStack>
        </Stack>
      </Overlay>
    </>
  );
}

Home.dashboard = true;
