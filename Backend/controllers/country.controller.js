const db = require('../db');

class CountryController{
    async getCountries(req,res){
        try{
            const countries = await db.query('SELECT * FROM Country');
            res.send(countries.rows); 
        }catch(error){
            res.status(400).send({ message: error.message });
        }
    }
 
    async createCountry(req,res){
        try{
            const {cname, population} = req.body;
            const newCountry = await db.query(`INSERT INTO Country (cname, population) VALUES('${cname}', ${population})`);
            res.json(newCountry.rows);         
        }catch(error){
            res.status(400).send({ message: error.message });
        }   
    }
    async getCountry(req,res){
        try{
            const {id} = req.params;
            const country = await db.query(`Select * FROM Country where cname = '${id}'`);
            res.send(country.rows[0]);
        }catch(error){
            res.status(400).send({ message: error.message });
        }
    } 
    async deleteCountry(req,res){ 
        try{
            const {id} = req.params;
            const country = await db.query(`DELETE FROM Country where "cname" = '${id}'`);
            res.json("deleted");
        }catch(error){
            res.status(400).send({ message: error.message });
        }
    }
    async updateCountry(req,res){ 
        try{
            const {cname, population} = req.body;
            const {id} = req.params;
            const country = await db.query(`UPDATE Country SET "cname" = '${cname}', "population" = ${population} where "cname" = '${id}';`);
            res.json("updated"); 
        }catch(error){
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = new CountryController(); 