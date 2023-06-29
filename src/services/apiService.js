import axios from "axios";

const backendApi = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const bdRhService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BD_DOMINIO}/api`,
  timeout: 30000,
});

export { backendApi, bdRhService };
