const db = require('./config');

function pedirTodas(tabla, callback){
    db.any(`SELECT * FROM ${tabla}`)
    .then(resultado=>{
        callback(null,resultado);
    })
    .catch(error=>{
        callback(error);
    })
}

module.exports={
    pedirTodas
}