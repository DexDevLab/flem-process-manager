import { processosController } from "@/controllers";
import { exceptionHandler } from "@/utils/exceptionHandler";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return processosController.get(req, res);
    case "POST":
      return processosController.post(req, res);
    default:
      return exceptionHandler(null);
  }
}
