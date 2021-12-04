const db = require('../db');

class DiseaseType{
    async getDiseaseType(req,res){
        try{
            const diseaseType= await db.query('SELECT * FROM DiseaseType');
            res.send(diseaseType.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async getDiseaseTypeById(req,res){
        try{
            const {id}= req.params;
            console.log(req.body);
            const diseases = await db.query(`SELECT * FROM DiseaseType where id = '${id}'`);
            res.send(diseases.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async createDiseaseType(req,res){
        try{
            const {id, description} = req.body;
            console.log(req.body);
            const disease = await db.query(`INSERT INTO DiseaseType values(${id},'${description}')`);
            res.json(disease.rows);      
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }      
    }
    async deleteDiseaseType(req,res){
        try{
            const {id} = req.params;
            const disease = await db.query(`Delete FROM DiseaseType where id = ${id}`);
            res.json("deleted");    
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }  
    }
    async updateDiseaseType(req,res){
        try{
            const {id, description} = req.body;
            console.log(req.body);
            const disease = await db.query(`UPDATE DiseaseType SET id = ${id}, description = '${description}'
            WHERE id = ${req.params.id};`);
            res.json(disease.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
}

module.exports = new DiseaseType();