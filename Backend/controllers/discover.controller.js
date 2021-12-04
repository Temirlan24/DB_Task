const db = require('../db');

class DiscoverController{
    async getDiscoveries(req,res){
        try{
            const discover = await db.query('SELECT * FROM Discover');
            res.send(discover.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
 
    async createDiscovery(req,res){
        try{
            const {cname, disease_code,first_enc_date} = req.body;
            const discover = await db.query(`INSERT INTO Discover (cname, disease_code, first_enc_date) VALUES('${cname}', '${disease_code}', '${first_enc_date}')`);
            res.json(discover.rows);     
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }       
    }
    async getDiscoveryById(req,res){
        try{
            const {cname_id, disease_code_id} = req.params;
            console.log(req.params);
            const discover = await db.query(`Select * FROM Discover where cname = '${cname_id}' and disease_code = '${disease_code_id}'`);
            res.send(discover.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    } 
    async deleteDiscovery(req,res){ 
        try{
            const {cname_id, disease_code_id} = req.params;
            const discover = await db.query(`DELETE FROM Discover where "cname" = '${cname_id}' and disease_code = '${disease_code_id}'`);
            res.json("deleted");
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async updateDiscovery(req,res){ 
        try{
            const {cname, disease_code, first_enc_date} = req.body;
            const {cname_id, disease_code_id} = req.params;
            console.log("Body", req.body);
            console.log(req.params);
            const discover = await db.query(`UPDATE Discover SET cname = '${cname}', 
                disease_code = '${disease_code}', first_enc_date = '${first_enc_date}'
                WHERE cname = '${cname_id}' AND disease_code = '${disease_code_id}';`);
            res.json("updated");  
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
} 
 
module.exports = new DiscoverController(); 