const express = require("express");
const app = express();
const auth = require('../middleware/auth')
const DB = require('../DB/connection')
const upload = require('../middleware/upload')
const {v4 : uuid} = require("uuid");

app.post('/post',auth, upload.single('image'), async (req, res, next) => {
    console.log("calling api");
    const db = await DB();
    var user_id = uuid()
    try {
      const { title, user_id} = req.body;
      var query = `INSERT INTO post(title, user_id) VALUES ('${title}', '${user_id}' )RETURNING *`
      console.log(query);
      var result = await db.query(query);
      console.log("result", result);
      result.message = "post added succesfully"
      res.status(200).json(result)
  
    } catch (err) {
      console.log("erron in adding new post", err);
      next(err);
    } finally {
      db.close();
    }
  });
  
  app.get('/getposts', async (req, res, next) => {
    console.log("calling apui");
    const db = await DB();
    try {
      result = {}
      const query = `SELECT * FROM public.post;`
      var result = await db.query(query);
      console.log("result", result);
      result.message = "todo all fetched succesfully"
      res.status(200).json(result)
    } catch (err) {
      console.log("error", err);
      next(err);
    } finally {
      db.close()
    }
  })
  
  app.get('/getById/:post_id', auth, async (req, res, next) => {
  
    console.log("calling apui");
    const db = await DB();
    const { post_id } = req.params;
    try {
      result = {}
      const query = `SELECT * FROM post where post_id='${post_id}';`
      var result = await db.query(query);
      console.log("result", result);
      result.message = "todo fetched succesfully"
      res.status(200).json(result)
    } catch (err) {
      console.log("error", err);
      next(err);
    } finally {
      db.close()
    }
  })
  
  
  app.delete('/delete/:post_id',auth, async (req, res, next) => {
    const db = await DB();
     const { post_id } = req.params;
    try {
      var result = {};
      var query = `DELETE from post where post_id='${post_id}'`;
      var result = await db.query(query);
      result.message = "deleted todo successfull";
      res.status(200).json(result);
    } catch (err) {
      console.log("error", err);
      next(err)
    } finally {
      db.close()
    }
  })

  app.delete('/softdelete/:post_id',auth, async (req, res, next) => {
    const db = await DB();
     const { post_id } = req.params;
    try {
      var result = {};
      var query = `UPDATE post SET deleted_at = now() where post_id='${post_id}'`;
      var result = await db.query(query);
      result.message = "deleted todo successfull";
      res.status(200).json(result);
    } catch (err) {
      console.log("error", err);
      next(err)
    } finally {
      db.close()
    }
  })
  
  app.put('/update/:post_id', auth, async (req, res, next) => {
    const db = await DB();
    const { post_id } = req.params;
    try {
      var result = {};
      const { title } = req.body;
      var query = `UPDATE post SET title='${title}' where post_id='${post_id}' RETURNING *`;
      var result = await db.query(query);
      console.log(result);
      result.message = "update succesfull";
      res.status(200).json(result)
    } catch (err) {
  
      console.log("error", err);
      next(err)
    } finally {
      db.close()
    }
  })

  module.exports = app