const express = require('express');

const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');

routes.post('/session', SessionController.create);

routes.post('/ong', OngController.create);
routes.get('/ong', OngController.list);

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.list);
routes.delete('/incidents/:idIncident', IncidentsController.delete);
module.exports = routes;