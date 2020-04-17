const connection = require('../database/connection');

module.exports = {
    async index(req, res) {

        const idOng = req.headers.idong;

        const incidents = await connection('tbIncidents').
            where('idOng', idOng).
            select('*');

        return res.json(incidents);
    } 
}