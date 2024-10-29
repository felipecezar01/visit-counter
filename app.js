const express = require('express');
const redis = require('redis');

const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.on('error', (err) => console.error('Erro no Redis', err));

const app = express();
app.use(express.static('public'));

app.get('/api/visits', async (req, res) => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            const visits = await client.incr('visits');
            res.send(`Número de visitas: ${visits}`);
        } else {
            res.send('Número de visitas: (modo teste)');
        }
    } catch (err) {
        res.status(500).send('Erro no Redis');
    }
});

module.exports = { app, client };
