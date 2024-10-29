const express = require('express');
const redis = require('redis');

// Configurando o cliente Redis
const client = redis.createClient({
    url: 'redis://redis:6379' // Para ambiente local, configurado como localhost
});

client.on('error', (err) => console.error('Erro no Redis', err));

const app = express();
const PORT = 3000;

// Função assíncrona para conectar o Redis
(async () => {
    await client.connect(); // Conectar o cliente Redis

    // Rota principal que incrementa e retorna o número de visitas
    app.get('/', async (req, res) => {
        try {
            const visits = await client.incr('visits');
            res.send(`Número de visitas: ${visits}`);
        } catch (err) {
            res.status(500).send('Erro no Redis');
        }
    });

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})();
