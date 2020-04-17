const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        
        const { titleIncidents, descriptionIncidents, valueIncidents } = req.body;

        const idOng = req.headers.idong;

        const [ id ] = await connection('tbIncidents').insert({
            titleIncidents,
            descriptionIncidents,
            valueIncidents,
            idOng
        });

        return res.json({ "id": id });
    },

    async list(req, res) {

        const { page = 1 } = req.query;

        const [ count ] = await connection('tbIncidents').count();

        // Inner Join and pagination
        const incidents = await connection('tbIncidents').
            join('tbOngs', 'tbOngs.idOng',  '=', 'tbIncidents.idOng').
            limit(5).
            offset( ( page - 1 ) * 5 ).
            select([
                'tbIncidents.*',
                'tbOngs.nameOng',
                'tbOngs.emailOng',
                'tbOngs.whatsappOng',
                'tbOngs.cityOng',
                'tbOngs.ufOng'
            ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async delete(req, res) {

        const { idIncident } = req.params;
        const idOng = req.headers.idong;

        const incident = await connection('tbIncidents').
            where('id', idIncident).
            select('idOng').first();

        if (incident.idOng != idOng) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('tbIncidents').where('id', idIncident).delete();

        return res.status(204).send();

    }
}