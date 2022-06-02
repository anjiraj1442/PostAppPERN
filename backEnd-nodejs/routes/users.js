const express = require("express");
const app = express();
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const DB = require('../DB/connection')
const nodemailer = require('../middleware/nodemailer');
const auth = require('../middleware/auth')
const { v4: uuid } = require("uuid");
require("dotenv").config;






app.post('/register', async (req, res, next) => {
    const db = await DB();
    var user_id = uuid()
    const { firstName, lastName, email, password } = req.body
    try {
        var query = `SELECT * FROM people WHERE email='${email}'`;
        var result = await db.query(query);
        console.log("all details", result);
        if (result.rowCount > 0) {
            return res.status(400).json("user already exist")
        } else {
            const salt = await bcrypt.genSalt(8);
            const bycrpass = await bcrypt.hash(password, salt)
            var query = `INSERT INTO people (firstName, lastName, email, password) VALUES ('${firstName}','${lastName}','${email}','${bycrpass}' )RETURNING *`
            let newUser = await db.query(query)
            newUser.message = "user created succesfully";
            res.status(200).json(newUser.rows[0])
        }


    } catch (err) {
        next(err)
        console.log("error while register", err);
    }
})

app.post('/signin', async (req, res, next) => {
    const db = await DB();
    const { email, password } = req.body;
    try {
        var query = `SELECT * FROM people WHERE email='${email}'`;
        var result = await db.query(query)
        console.log("all details", result);
        if (result.rows[0].email == 0) {
            return res.status(401).json("email not registered")
        } else {
            const hashpass = result.rows[0].password;

            console.log("hasspass", hashpass);
            const validPass = await bcrypt.compare(password, hashpass)


            if (validPass) {
                const payload = {
                    email: result.rows[0].email,
                    password: result.rows[0].password
                }
                const token = jwt.sign(payload, process.env.SECRETTOKEN, { expiresIn: '1h' })
                console.log("token", token);

                return res.status(200).json("login succs")



            } else {
                return res.status(401).json("failed")
            }
        }


    } catch (err) {
        next(err)
        console.log("error while login", err);


    }
})


app.post('/forgotpass', auth, async (req, res, next) => {
    const db = await DB();
    const { email } = req.body;
    try {
        var query = `SELECT * FROM people WHERE email='${email}'`;
        var result = await db.query(query);
        console.log("all details", result.rows[0].email);
        if (result.rows[0].email == 0) {
            return res.status(401).json("email not registered")
        } else {

            const payload = {
                email: result.rows[0].email,
                password: result.rows[0].password
            }
            const token = jwt.sign(payload, process.env.SECRETTOKEN, { expiresIn: '1h' })
            console.log("token", token);
            let status = nodemailer.sendMail(token, result.rows[0].email)
            return status;


        }

        

    } catch (err) {
        next(err)
        console.log("error while register", err);
    }
})


module.exports = app;