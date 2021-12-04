const db = require('../db');

class Users{
    async getUsers(req,res){
        try{
            const users = await db.query('SELECT * FROM Users');
            res.send(users.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }

    async createUser(req,res){
        try{
            const {email, name, surname, salary, phone,cname} = req.body;
            const newUser = await db.query(`INSERT INTO Users(email, name, surname, salary, phone, cname) 
            values('${email}','${name}', '${surname}', ${salary},'${phone}','${cname}')`);
            res.json(newUser);    
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }        
    }
    async getUser(req,res){
        try{
            const {id} = req.params;
            const user = await db.query(`Select * FROM Users where email = '${id}'`);
            res.send(user.rows[0]);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    } 
    async deleteUser(req,res){  
        try{
            const {id} = req.params;
            const user = await db.query(`DELETE FROM Users where email = '${id}'`);
            res.json("deleted"); 
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    }
    async updateUser(req,res){
        try{
            const {email, name, surname, salary, phone,cname} = req.body;
            const {id} = req.params;
            console.log("Email", id);
            const country = await db.query(`UPDATE Users 
            SET "email" = '${email}', name = '${name}', surname = '${surname}', 
            salary = ${salary}, phone = '${phone}', cname = '${cname}' 
            WHERE email = '${id}'`);
            res.json(country.rows);
        }catch(error){
                        res.status(400).send({ message: error.message });
;
        }
    } 
}

module.exports = new Users(); 