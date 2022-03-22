const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getClinicServices,getAClinicService,addClinicService,updateClinicService,deleteClinicService} = require("./../Controllers/ClinicService.controller")


//get all Clinic Services
router.get("", getClinicServices);


//get a Clinic Service data
router.get("/one", getAClinicService);

//add new Clinic Service route
router.post("", [
    body("name").isString().withMessage("Patient Name should be String"),
    body("invoiceAmount").isNumeric().withMessage("InvoiceAmount contains numbers only"),
   
], addClinicService);

//update Clinic Service route
router.put("", [
    body("name").isString().withMessage("Patient Name should be String"),
    body("invoiceAmount").isNumeric().withMessage("InvoiceAmount contains numbers only"),
  
], updateClinicService);

router.delete("", deleteClinicService);
module.exports = router;