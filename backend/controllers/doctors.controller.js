const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const Doctor = require("../models/doctors");
const ClinicService = require("../models/ClinicService");

//get all doctors
exports.getDoctors = (req, res, next) => {
    Doctor.find({},{password:0,__v:0})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific doctor 
exports.getADoctor = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    //let projection = { _id:1,password: 1 };

    Doctor.findById(_id,{password:0,__v:0})
        .then(data => {
            if (data == null) {
                throw new Error("Doctor not Found!")
            } else {
                res.status(200).json( data )
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}



//get doctors by clinic Service ID 
exports.getDoctorsByClinciService = (req, res, next) => {
    const { clinicServiceID } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }

    Doctor.find({ 'clinicServiceID': clinicServiceID })
        .then(data => {
            if (data == null) {
                throw new Error("there are no doctors in the Service")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//add new doctor
exports.addDoctor = async (req, res, next) => {
    try {
        const { firstname, lastname, password, email, gender, phone, clinicServiceID, attendingDays, startTime, endTime } = req.body;
        let birthDate = new Date(req.body.birthDate);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }
        //check clinic service exists
        await ClinicService.findById(clinicServiceID).then(c => { if (!c) { throw new Error("ClinicService not Found!") } })

        //check duplicated email
        const existedDoctor = await Doctor.findOne({ email })
        if (existedDoctor) return res.status(400).json({ error: "Email Already Exists" })

        let doctor = await new Doctor({
            firstname, lastname, email,
            image: req.file.filename,
            password: bcrypt.hashSync(password, 10),
            gender, phone, birthDate,
            clinicServiceID, attendingDays,
            startTime, endTime
        });
        const doc = await doctor.save()
        await res.status(201).json({ id: doc._id })


    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }







}
//update doctor
exports.updateDoctor = async (req, res, next) => {
    try {


        const { _id, firstname, lastname, password, email, gender, phone, clinicServiceID, attendingDays, startTime, endTime } = req.body;
        let birthDate = new Date(req.body.birthDate);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }

        //check clinic service exists
        await ClinicService.findById(clinicServiceID).then(c => { if (!c) { throw new Error("ClinicService not Found!") } })

        const doc = await Doctor.findByIdAndUpdate(_id, {
            $set: {
                firstname, lastname, email,
                password: bcrypt.hashSync(password, 10),
                gender, phone, birthDate,
                clinicServiceID, attendingDays,
                startTime, endTime
            }
        })
        if (doc == null) {
            throw new Error("Doctor not Found!")
        } else {
            await res.status(200).json({ message: "updated" })
        }

    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }

}

//delete doctor
exports.deleteDoctor = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Doctor.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("Doctor not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}