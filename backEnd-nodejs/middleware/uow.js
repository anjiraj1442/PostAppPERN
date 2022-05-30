var DB = require("../DB/Connection");

async function initDb(req, res, next) {
    const db = await DB();

    req.db = db;
    next();
}

const uow = { initDb };

module.exports = uow;