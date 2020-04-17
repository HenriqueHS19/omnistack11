const connection = require('../database/connection');

module.exports = {

    async create(req, res) {

        const { idOng } = req.body;

        const ong = await connection('tbOngs').
            where('idOng', idOng).
            select('nameOng').
            first();

        if (!ong) {
            return res.status(400).json({ error: 'No ONG found with this ID' });
        }

        return res.json(ong);
    }
}