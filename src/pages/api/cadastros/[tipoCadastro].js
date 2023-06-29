import { cadastrosController } from "@/controllers";
import { exceptionHandler } from "@/utils/exceptionHandler";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return cadastrosController.post(req, res);
    default:
      return exceptionHandler(null);
  }
}
