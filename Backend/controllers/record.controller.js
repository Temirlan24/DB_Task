const db = require('../db');

class RecordController{
    async getRecords(req,res){
        try{
            const record = await db.query('SELECT * FROM Record');
            res.send(record.rows); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
 
    async createRecord(req,res){
        try{
            const {email,cname, disease_code, total_death, total_patients} = req.body;
            const newRecord = await db.query(`INSERT INTO Record (email, cname, disease_code, total_death, total_patients) VALUES('${email}','${cname}', '${disease_code}', ${total_death}, ${total_patients})`);
            res.json(newRecord.rows); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }           
    }
    async getRecordById(req,res){
        try{
            const {email_id, cname_id, disease_code_id} = req.params;
            const record = await db.query(`Select * FROM Record where email = '${email_id}' AND cname = '${cname_id}' ANd disease_code = '${disease_code_id}'`);
            res.send(record.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    } 
    async deleteRecord(req,res){ 
        try{
            const {email_id, cname_id, disease_code_id} = req.params;
            const record = await db.query(`DELETE FROM Record where email = '${email_id}' AND cname = '${cname_id}' ANd disease_code = '${disease_code_id}'`);
            res.json("deleted");
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async updateRecord(req,res){
        try{
            const {email,cname, disease_code, total_death, total_patients} = req.body;
            const {email_id, cname_id, disease_code_id} = req.params;
            const record = await db.query(`UPDATE Record SET email = '${email}',cname = '${cname}', disease_code = '${disease_code}',
            total_death = ${total_death},
            total_patients = ${total_patients}
            WHERE email = '${email_id}' AND cname = '${cname_id}' ANd disease_code = '${disease_code_id}';`);
            res.json("updated"); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
}

module.exports = new RecordController(); 