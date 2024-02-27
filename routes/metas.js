var express = require('express');
const { pedirTodas } = require('../db/pedidos');
var router = express.Router();


let metas = [
  {
    "id": "1",
    "detalles": "Correr por 30 minutos",
    "plazo": "día",
    "frecuencia": 1,
    "icono": "🏃‍♂️",
    "meta": 365,
    "fecha_límite": "2030-01-01",
    "completado": 5
  },
  {
    "id": "2",
    "detalles": "Leer libros",
    "plazo": "año",
    "frecuencia": 6,
    "icono": "📚",
    "meta": 12,
    "fecha_límite": "2030-01-01",
    "completado": 0
  },
  {
    "id": "3",
    "detalles": "Viajar a nuevos lugares",
    "plazo": "mes",
    "frecuencia": 1,
    "icono": "✈️",
    "meta": 60,
    "fecha_límite": "2030-01-01",
    "completado": 40
  }
];


/* GET Lista de metas */
router.get('/', function(req, res, next) {
  pedirTodas('metas', (err, metas)=>{
    if(err){
      const error = new Error('Error al obtener metas')
      error.cause = err
      return next(error)
    }
    console.log(metas)
    res.send(metas)
  });
});

/* GET Lista de metas con ID */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const meta = metas.find(item => item.id === id);
  if(!meta){
    return res.sendStatus(404);
  }
  res.send(meta)
});

/* POST Crear nueva meta */
router.post('/', function(req, res, next) {
  const meta = req.body;
  metas.push(meta);
  res.status(201);
  res.send(meta);
});

/* PUT Actualizar meta */
router.put('/:id', function(req, res, next) {
  const meta = req.body;
  const id = req.params.id;
  if(meta.id !== id){
    return res.sendStatus(409);
  }
  const indice = metas.findIndex(item => item.id === id);
  if(indice === -1){
    return res.sendStatus(404);
  }
  metas[indice] = meta;
  res.send(meta);
}); 

/* DELETE Borrar meta */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const indice = metas.findIndex(item => item.id === id);
  if (indice === -1){
    return res.sendStatus(404);
  }
  metas.splice(indice, 1);
  res.sendStatus(204);
});

module.exports = router;
