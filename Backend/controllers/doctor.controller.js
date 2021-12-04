const db = require('../db');

class DoctorController{
    async getDoctor(req,res){
        try{
            const doctor = await db.query('SELECT * FROM Doctor');
            res.send(doctor.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async getDoctorById(req,res){
        try{
            const {id}= req.params;
            const doctor = await db.query(`SELECT * FROM Doctor where email = '${id}'`);
            res.send(doctor.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async createDoctor(req,res){
        try{
            const {email, degree} = req.body;
            const doctor = await db.query(`INSERT INTO Doctor values('${email}', '${degree}')`);
            res.json(doctor.rows);        
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }    
    }
    async deleteDoctor(req,res){
        try{
            const {id} = req.params;
            const doctor = await db.query(`Delete FROM Doctor where email = '${id}'`);
            res.json("deleted");    
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }  
    }
    async updateDoctor(req,res){
        try{
            const {email, degree} = req.body;
            const {id} = req.params;
            const doctor = await db.query(`UPDATE Doctor SET email = '${email}', degree = '${degree}'
                where email = '${id}';`);
            res.json(doctor.rows); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
}

module.exports = new DoctorController(); 