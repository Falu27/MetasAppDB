const initOption = {};
const pgp= require('pg-promise')(initOption);

const cn = {
    user:"postgres",
    password:"Falu1991",
    host:"localhost",
    port:5432,
    database:"metas_app"
};

const db = pgp(cn);

module.exports = db;