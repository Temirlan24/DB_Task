const db = require('../db');

class PublicServantController{
    async getPublicServant(req,res){
        try{
            const publicServant = await db.query('SELECT * FROM publicServant');
            res.send(publicServant.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async getPublicServantById(req,res){
        try{
            const {id}= req.params;
            const publicServant = await db.query(`SELECT * FROM publicServant where email = '${id}'`);
            res.send(publicServant.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async createPublicServant(req,res){
        try{
            const {email, department} = req.body;
            const publicServant = await db.query(`INSERT INTO publicServant values('${email}', '${department}')`);
            res.json(publicServant.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }       
    }
    async deletePublicServant(req,res){
        try{
            const {id} = req.params;
            const publicServant = await db.query(`Delete FROM publicServant where email = '${id}'`);
            res.json("deleted");
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }   
    }
    async updatePublicServant(req,res){
        try{
            const {email, department} = req.body;
            const {id} = req.params;
            const publicServant = await db.query(`UPDATE publicServant SET email = '${email}', department = '${department}'
            where email = '${id}';`);
            res.json(publicServant.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
}

module.exports = new PublicServantController(); 