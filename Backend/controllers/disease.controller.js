const db = require('../db');

class DiseaseController{
    async getDiseases(req,res){
        try{
            const diseases = await db.query('SELECT * FROM Disease');
            res.send(diseases.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async getDiseaseById(req,res){
        try{
            const {id}= req.params;
            const diseases = await db.query(`SELECT * FROM Disease where disease_code = '${id}'`);
            res.send(diseases.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async createDisease(req,res){
        try{
            const {disease_code, pathogen, description, id} = req.body;
            const disease = await db.query(`INSERT INTO Disease values('${disease_code}', '${pathogen}','${description}', ${id})`);
            res.json(disease.rows);  
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }          
    }
    async deleteDisease(req,res){
        try{
            const {id} = req.params;
            const disease = await db.query(`Delete FROM Disease where disease_code = '${id}'`);
            res.json("deleted");    
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async updateDisease(req,res){
        try{
            const {disease_code, pathogen, description, id} = req.body;
            console.log("Update", req.params.id);
            const disease = await db.query(`UPDATE Disease SET disease_code = '${disease_code}', pathogen = '${pathogen}',
            description = '${description}', id = ${id}
            WHERE "disease_code" = '${req.params.id}';`);
            res.json(disease.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
}

module.exports = new DiseaseController(); 