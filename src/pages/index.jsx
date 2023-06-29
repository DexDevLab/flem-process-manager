import { FormMaker } from "@/components/Form";
import { MenuIconButton } from "@/components/Menus/MenuIconButton";
import { Overlay } from "@/components/Overlay";
import { Table } from "@/components/Table";
import { useCustomForm } from "@/hooks";
import { backendApi } from "@/services";
import { exceptionHandler } from "@/utils/exceptionHandler";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  Stack,
  useBreakpointValue,
  useDisclosure,
  useToast,
  useToken,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiArrowDown,
  FiMoreHorizontal,
  FiPenTool,
  FiPlus,
} from "react-icons/fi";
import { PulseLoader } from "react-spinners";

export default function Home() {
  const formAdicionarProcesso = useCustomForm();
  const formSaidaProcesso = useCustomForm();
  const formAlteraSubcritorProcesso = useCustomForm();
  const [cadastrosOptions, setCadastrosOptions] = useState([]);
  const [processosTableData, setProcessosTableData] = useState([]);
  const toastPosition = useBreakpointValue({ base: "bottom", md: "top-right" });
  const toast = useToast({
    duration: 5000,
    isClosable: false,
    status: "success",
  });

  const showTable = useDisclosure();

  const formAdicionarProcessoInputs = [
    {
      id: "id_Atividade",
      formControl: formAdicionarProcesso.control,
      label: "Atividade",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Tipos_Atividades,
      required: false,
    },
    {
      id: "id_Tecnico",
      formControl: formAdicionarProcesso.control,
      label: "Técnico",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Tecnicos,
      required: false,
    },
    {
      id: "dataEntrada",
      formControl: formAdicionarProcesso.control,
      label: "Data de Entrada",
      type: "datetime-local",
      defaultValue: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
      required: true,
    },
    {
      id: "protocolo",
      formControl: formAdicionarProcesso.control,
      label: "Protocolo",
      type: "number",
      required: false,
    },
    {
      id: "numSD",
      formControl: formAdicionarProcesso.control,
      label: "Nº Solicitação de Despesa",
      type: "number",
      required: false,
    },
    {
      id: "numRC",
      formControl: formAdicionarProcesso.control,
      label: "Nº  Requisição de Compra",
      type: "number",
      required: false,
    },
    {
      id: "id_Demandante",
      formControl: formAdicionarProcesso.control,
      label: "Demandante",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Demandantes,
      required: false,
    },
    {
      id: "projSetor",
      formControl: formAdicionarProcesso.control,
      label: "Projeto/Setor",
      required: false,
    },
    {
      id: "numProcesso",
      formControl: formAdicionarProcesso.control,
      // control: formAdicionarProcesso.control.control,
      format: "00####/##",
      mask: "######/##",
      label: "Nº Processo",
      validate: (v) => new RegExp(/^\d{6}\/\d{2}$/).test(v),
      required: false,
    },
    {
      id: "numParecer",
      formControl: formAdicionarProcesso.control,
      mask: "###/##",
      label: "Nº Parecer",
      validate: (v) => new RegExp(/^\d{3}\/\d{2}$/).test(v),
      required: false,
    },
    {
      id: "id_TipoParecer",
      formControl: formAdicionarProcesso.control,
      label: "Tipo de Parecer",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Tipos_Parecer,
      required: false,
    },
    {
      id: "objeto",
      formControl: formAdicionarProcesso.control,
      label: "Objeto",
      required: false,
    },
    {
      id: "id_Formalizacao",
      formControl: formAdicionarProcesso.control,
      label: "Tipo de Formalização",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Tipos_Formalizacoes,
      required: false,
    },
    {
      id: "fornecedor",
      formControl: formAdicionarProcesso.control,
      label: "Fornecedor",
      required: false,
    },
    {
      id: "numContrato",
      formControl: formAdicionarProcesso.control,
      mask: "######/##",
      label: "Nº Contrato",
      validate: (v) => new RegExp(/^\d{6}\/\d{2}$/).test(v),
      required: false,
    },
    {
      id: "valor",
      formControl: formAdicionarProcesso.control,
      label: "Valor",
      type: "number",
      prefix: "R$ ",
      thousandSeparator: ".",
      decimalSeparator: ",",
      fixedDecimalScale: true,
      decimalScale: 2,
      required: false,
    },
    {
      id: "id_TipoAditivo",
      formControl: formAdicionarProcesso.control,
      label: "Tipo de Aditivo",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Tipos_Aditivo,
      required: false,
    },
    {
      id: "id_Subscritor",
      formControl: formAdicionarProcesso.control,
      label: "Subscritor",
      type: "select",
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Subscritores,
      required: false,
    },
  ];

  const formSaidaProcessoInputs = [
    {
      id: "dataSaidaProcesso",
      formControl: formSaidaProcesso.control,
      label: "Atividade",
      type: "datetime-local",
      defaultValue: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
      required: true,
    },
  ];

  const formAlterarSubscritorProcessoInputs = [
    {
      id: "id_Subscritor",
      formControl: formAlteraSubcritorProcesso.control,
      label: "Subscritor",
      type: "select",
      defaultValue: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Subscritores.find(
            ({ value }) =>
              value ===
              formAlteraSubcritorProcesso.control.getValues(
                "id_Subscritor_Atual"
              )
          ),
      options: isEmpty(cadastrosOptions)
        ? []
        : cadastrosOptions.cadastros_Subscritores,
      required: false,
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Atividade",
        accessor: "Cadastros_Tipos_Atividades.nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Técnico",
        accessor: "Cadastros_Tecnicos.nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Data de Entrada",
        accessor: "dataEntrada",
        Cell: ({ value }) => (
          <Box minW={200}>
            {DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_FULL)}
          </Box>
        ),
        Footer: false,
      },
      {
        Header: "Protocolo",
        accessor: "protocolo",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Nº SD",
        accessor: "numSD",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Nº RC",
        accessor: "numRC",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Demandante",
        accessor: "Cadastros_Demandantes.nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Projeto/Setor",
        accessor: "projSetor",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Nº Processo",
        accessor: "numProcesso",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Nº Parecer",
        accessor: "numParecer",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Tipo Parecer",
        accessor: "Cadastros_Tipos_Parecer.nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Objeto",
        accessor: "objeto",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Formalização",
        accessor: "Cadastros_Tipos_Formalizacoes.nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Fornecedor",
        accessor: "fornecedor",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Nº Contrato",
        accessor: "numContrato",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Valor",
        accessor: "valor",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Tipo Aditivo",
        accessor: "Cadastros_Tipos_Aditivo.nome",
        Cell: ({ value }) => <Box minW={200}>{value}</Box>,
        Footer: false,
      },
      {
        Header: "Subscritor",
        accessor: "Cadastros_Subscritores.nome",
        Cell: ({ value }) => (
          <Box minW={200}>{!isEmpty(value) ? value : "Não Atribuído"}</Box>
        ),
        Footer: false,
      },
      {
        Header: "Data da Saída",
        accessor: "dataSaida",
        Cell: ({ value }) => (
          <Box minW={200}>
            {!isEmpty(value)
              ? DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_FULL)
              : "Saída não efetuada"}
          </Box>
        ),
        Footer: false,
      },
      {
        Header: "Ações",
        Cell: (props) => (
          <MenuIconButton
            icon={<FiMoreHorizontal />}
            menuItems={[
              {
                menuGroupLabel: null,
                menuGroupButtons: [
                  {
                    text: `${
                      isEmpty(props.row.original.cadastros_SubscritoresId)
                        ? "Atribuir"
                        : "Alterar"
                    } subscritor`,
                    icon: <FiPenTool />,
                    onClick: () => {
                      formAlteraSubcritorProcesso.control.register("id", {
                        value: props.row.original.id,
                      });
                      formAlteraSubcritorProcesso.control.register(
                        "id_Subscritor_Atual",
                        {
                          value: props.row.original.cadastros_SubscritoresId,
                        }
                      );
                      formAlteraSubcritorProcesso.openOverlay();
                    },
                  },
                  {
                    text: "Realizar saída do processo",
                    icon: <FiArrowDown />,
                    disabled: !isEmpty(props.row.original.dataSaida),
                    onClick: () => {
                      formSaidaProcesso.control.register("id", {
                        value: props.row.original.id,
                      });
                      formSaidaProcesso.openOverlay();
                    },
                  },
                ],
              },
            ]}
            colorScheme="primary"
          />
        ),
        Footer: false,
      },
    ],
    []
  );

  const onSubmitForm = useCallback(
    async (formData, e) => {
      formAdicionarProcesso.setLoading();
      e.preventDefault();
      try {
        const { data } = await backendApi.post(`/processos`, formData);
        toast({
          title: "Cadastro efetuado com sucesso",
          position: toastPosition,
        });
        formAdicionarProcesso.closeOverlay();

        console.log(data);
      } catch (error) {
        const exception = exceptionHandler(error);
        if (exception.code == 500) {
          exception.title = "Houve um erro";
          exception.description =
            "Verifique se todos os campos foram preenchidos corretamente e tente novamente.";
          exception.duration = 5000;
        }
        toast(exception);
      } finally {
        formAdicionarProcesso.setLoaded();
        return null;
      }
    },
    [toastPosition]
  );

  const onSubmitSaidaProcessoForm = useCallback(
    async ({ id, ...formData }, e) => {
      formSaidaProcesso.setLoading();
      e.preventDefault();
      try {
        const { data } = await backendApi.put(`/processos/${id}`, formData);
        toast({
          title: "Saída efetuada com sucesso",
          position: toastPosition,
        });
        formSaidaProcesso.closeOverlay();
      } catch (error) {
        toast(exceptionHandler(error));
      } finally {
        formSaidaProcesso.setLoaded();
        return null;
      }
    },
    [toastPosition]
  );

  const onSubmitSubscritorProcessoForm = useCallback(
    async ({ id, ...formData }, e) => {
      formAlteraSubcritorProcesso.setLoading();
      e.preventDefault();
      try {
        console.log(formData);
        const { data } = await backendApi.put(`/processos/${id}`, formData);
        toast({
          title: "Subscritor alterado com sucesso",
          position: toastPosition,
        });
        formAlteraSubcritorProcesso.closeOverlay();
      } catch (error) {
        toast(exceptionHandler(error));
      } finally {
        formAlteraSubcritorProcesso.setLoaded();
        return null;
      }
    },
    [toastPosition]
  );

  const getTableData = useCallback(async () => {
    try {
      showTable.onClose();
      const { data } = await backendApi.get("/processos");
      setProcessosTableData(data);
      setTimeout(showTable.onOpen, 100);
    } catch (error) {
      toast(exceptionHandler(error));
    }
  }, []);

  const getAddProcessoOptions = useCallback(async () => {
    try {
      showTable.onClose();
      const { data } = await backendApi.get("/cadastros");
      const options = Object.assign(
        {},
        ...Object.keys(data).map((key) => ({
          [key]: data[key].map(({ id, nome }) => ({ value: id, label: nome })),
        }))
      );
      setCadastrosOptions(options);
      setTimeout(showTable.onOpen, 100);
    } catch (error) {
      toast(exceptionHandler(error));
    }
  }, []);

  useEffect(() => {
    if (!formAdicionarProcesso.overlayIsOpen) getTableData();
  }, [formAdicionarProcesso.overlayIsOpen]);
  useEffect(() => {
    if (!formSaidaProcesso.overlayIsOpen) getTableData();
  }, [formSaidaProcesso.overlayIsOpen]);
  useEffect(() => {
    if (!formAlteraSubcritorProcesso.overlayIsOpen) getTableData();
  }, [formAlteraSubcritorProcesso.overlayIsOpen]);

  useEffect(() => {
    getAddProcessoOptions();
  }, []);

  return (
    <>
      <Head>
        <title>Process Manager</title>
        <meta name="description" content="FLEM Process Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack spacing={4}>
        <HStack justifyContent="space-between">
          <Heading size="lg">Process Manager</Heading>
          <Button
            colorScheme="primary"
            leftIcon={<Icon as={FiPlus} />}
            iconSpacing={1}
            onClick={formAdicionarProcesso.openOverlay}
          >
            Adicionar
          </Button>
        </HStack>
        <Flex justifyContent="space-between">
          <Heading size="md">Processos</Heading>
          <Center as={ScaleFade} in={!showTable.isOpen}>
            <PulseLoader color={useToken("colors", "primary.500")} />
          </Center>
        </Flex>
      </Stack>
      <Box pt={4}>
        <Box shadow="lg" rounded="lg">
          <Collapse in={showTable.isOpen}>
            <Box bg="white" pt={2} rounded="lg">
              <Table data={processosTableData} columns={columns} />
            </Box>
          </Collapse>
        </Box>
      </Box>
      {/* Acicionar Processo Overlay */}
      <Overlay
        onClose={formAdicionarProcesso.closeOverlay}
        onCloseComplete={formAdicionarProcesso.control.reset}
        isOpen={formAdicionarProcesso.overlayIsOpen}
        header="Adicionar processo"
        closeButton
      >
        <Box
          as="form"
          onSubmit={formAdicionarProcesso.handleSubmit(onSubmitForm)}
        >
          <FormMaker>{formAdicionarProcessoInputs}</FormMaker>
          <HStack justifyContent="flex-end" pt={4}>
            <Button
              type="submit"
              colorScheme="primary"
              isDisabled={!formAdicionarProcesso.validation}
              isLoading={formAdicionarProcesso.isLoading}
              loadingText="Aguarde..."
            >
              Cadastrar
            </Button>
          </HStack>
        </Box>
      </Overlay>

      {/* M Realizar Saída do Processo Modal */}
      <Modal
        isCentered
        isOpen={formSaidaProcesso.overlayIsOpen}
        onClose={formSaidaProcesso.closeOverlay}
      >
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={formSaidaProcesso.handleSubmit(onSubmitSaidaProcessoForm)}
        >
          <ModalHeader as={HStack} spacing={3}>
            <Icon
              as={FiArrowDown}
              bg="primary.500"
              color="white"
              boxSize="6"
              p={0.5}
              rounded="lg"
            />
            <Heading size="md">Realizar saída do processo</Heading>
          </ModalHeader>
          <ModalBody>
            <FormMaker>{formSaidaProcessoInputs}</FormMaker>
          </ModalBody>

          <ModalFooter as={HStack}>
            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={formSaidaProcesso.closeOverlay}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isDisabled={!formSaidaProcesso.validation}
              isLoading={formSaidaProcesso.isLoading}
              loadingText="Aguarde..."
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* M Adicionar/alterar subscritor Modal */}
      <Modal
        isCentered
        isOpen={formAlteraSubcritorProcesso.overlayIsOpen}
        onClose={formAlteraSubcritorProcesso.closeOverlay}
      >
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={formAlteraSubcritorProcesso.handleSubmit(
            onSubmitSubscritorProcessoForm
          )}
        >
          <ModalHeader as={HStack} spacing={3}>
            <Icon
              as={FiArrowDown}
              bg="primary.500"
              color="white"
              boxSize="6"
              p={0.5}
              rounded="lg"
            />
            <Heading size="md">Alterar subscritor</Heading>
          </ModalHeader>
          <ModalBody>
            <FormMaker>{formAlterarSubscritorProcessoInputs}</FormMaker>
          </ModalBody>

          <ModalFooter as={HStack}>
            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={formAlteraSubcritorProcesso.closeOverlay}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isDisabled={!formAlteraSubcritorProcesso.validation}
              isLoading={formAlteraSubcritorProcesso.isLoading}
              loadingText="Aguarde..."
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

Home.dashboard = true;
