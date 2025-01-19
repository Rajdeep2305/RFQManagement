import express from "express";
import { validateCreateRFQ } from "../middleware/validateCreateRFQ.js";
import { CreateRFQ, DeleteRfqID, fetchRFQ, ShowAllRfqData, showRFQs } from "../controllers/buyerControl.js";
import { validateRegisterId } from "../middleware/validateRegisterId.js";
import { validateRfqID } from "../middleware/validateRFQId.js";
import {getUserRegistrationId} from "../middleware/getRegistrationId.js";

const rfqRoutes = express.Router();

// Route with middleware
rfqRoutes.post("/createRfq", validateCreateRFQ, CreateRFQ);
rfqRoutes.post("/showRfq",getUserRegistrationId, validateRegisterId, showRFQs);
rfqRoutes.post("/deleteRfq", validateRfqID, DeleteRfqID);
rfqRoutes.get("/indOneRFQ", validateRfqID, fetchRFQ);
rfqRoutes.get("/data",ShowAllRfqData)

export default rfqRoutes;