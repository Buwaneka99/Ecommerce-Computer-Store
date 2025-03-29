import { getRequestSupplier, putRequestSupplier, createRequestSupplier } from "../Controllers/supplyRequestController";

const supplyRequestRouter = express.Router();

supplyRequestRouter.route("/").get(getRequestSupplier).post(createRequestSupplier);
supplyRequestRouter.route("/:id").put(putRequestSupplier);

export default supplyRequestRouter;