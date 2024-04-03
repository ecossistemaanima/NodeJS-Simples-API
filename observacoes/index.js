const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();
app.use(bodyParser.json());

const { v4: uuidv4 } = require('uuid');
const observacoesPorLembreteId = {};

app.get('/', (req, res) => {
    res.send({"Message": "Welcome"})
});

app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

app.listen(5000, () => {
    console.log('Lembretes. Porta 5000');
});