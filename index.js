const express = require('express');
const redis = require('redis');

// Configurando o cliente Redis
const client = redis.createClient({
    url: 'redis://redis:6379' // Para ambiente local no Docker
});

client.on('error', (err) => console.error('Erro no Redis', err));

const app = express();
const PORT = 3000;

// Configurando o backend para servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Função assíncrona para conectar o Redis e iniciar o servidor
(async () => {
    await client.connect(); // Conectar o cliente Redis

    // API que incrementa e retorna o número de visitas
    app.get('/api/visits', async (req, res) => {
        try {
            const visits = await client.incr('visits');
            res.send(`Número de visitas: ${visits}`);
        } catch (err) {
            res.status(500).send('Erro no Redis');
        }
    });

    // Inicia o servidor na porta definida
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})();
