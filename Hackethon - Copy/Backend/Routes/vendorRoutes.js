import express from "express";
import { validateVendorID } from "../middleware/validateVendorID.js";
import { CreateVendor, DeleteVendorByVendorID, ShowAllVendorData, showVendor } from "../controllers/venderController.js";
import { validateCreateVendor } from "../middleware/validateCreateVendor.js";
import { validateRegisterId } from "../middleware/validateRegisterId.js";

const vendorRouter = express.Router(); 

// Route with middleware
vendorRouter.post("/delete-vendor-by-vendor", validateVendorID, DeleteVendorByVendorID);
vendorRouter.post("/Search_Vender_By_Id", validateVendorID, DeleteVendorByVendorID);
vendorRouter.post("/show-vendor", validateRegisterId, showVendor);
vendorRouter.post("/create-vendor", validateCreateVendor, CreateVendor);
vendorRouter.get("/data",ShowAllVendorData);

export default vendorRouter;
