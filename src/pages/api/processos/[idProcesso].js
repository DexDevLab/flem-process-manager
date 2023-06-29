import { processosController } from "@/controllers";
import { exceptionHandler } from "@/utils/exceptionHandler";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return processosController.put(req, res);
    default:
      return exceptionHandler(null);
  }
}
