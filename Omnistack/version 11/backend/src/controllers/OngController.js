const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {

        const { nameOng, emailOng, whatsappOng, cityOng, ufOng } = req.body;

        // create aleatory string hexadecimal
        const idOng = crypto.randomBytes(4).toString('HEX');

        await connection('tbOngs').insert({
            idOng,
            nameOng,
            emailOng,
            whatsappOng, 
            cityOng, 
            ufOng
        });

        return res.json({ idOng });
    },

    async list(req, res) {

        const ongs = await connection('tbOngs').select('*');

        return res.json(ongs);
    } 
}