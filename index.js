const { app, client } = require('./app');

const PORT = 3000;

// Função para iniciar o servidor e conectar ao Redis
(async () => {
    await client.connect(); // Conectar o cliente Redis
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})();
