const db = require('../db');

class SpecializeController{
    async getSpecialize(req,res){
        try{
            const specialize = await db.query('SELECT * FROM Specialize');
            console.log(specialize.rows);
            res.send(specialize.rows); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
 
    async createSpecialize(req,res){
        try{
            const {id, email} = req.body;
            const specialize = await db.query(`INSERT INTO Specialize (id, email) VALUES(${id}, '${email}')`);
            res.json(specialize.rows);   
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }         
    }
    async getSpecializeById(req,res){
        try{
            const {specialize_id, email_id} = req.params; 
            const specialize = await db.query(`Select * FROM Specialize where id = ${specialize_id} AND email = '${email_id}'`);
            res.send(specialize.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    } 
    async deleteSpecialize(req,res){ 
        try{
            const {specialize_id, email_id} = req.params; 
            const specialize = await db.query(`DELETE FROM Specialize where id = ${specialize_id} AND email = '${email_id}'`);
            res.json("deleted");
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async updateSpecialize(req,res){ 
        try{
            const {id, email} = req.body;
            const {specialize_id, email_id} = req.params; 
            console.log("body", req.body);
            console.log("Params", req.params);
            const specialize = await db.query(`UPDATE Specialize SET id = ${id}, email = '${email}' 
            where id = ${specialize_id} AND email = '${email_id}';`);
            res.json("updated"); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
}
 
module.exports = new SpecializeController();  