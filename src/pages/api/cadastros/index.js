import { cadastrosController } from "@/controllers";
import { exceptionHandler } from "@/utils/exceptionHandler";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return cadastrosController.get(req, res);
    default:
      return exceptionHandler(null);
  }
}
