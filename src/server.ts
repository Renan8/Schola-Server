import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.status(200).json({
        message: 'Sucesso'
    });
});

app.listen(4040);