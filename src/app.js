const http = require('http');
const express = require('express');
const status = require('http-status');
const spoilersRoute = require('./routes/spoilers');
const sequelize = require('./database/database');

const app = express();

//const hostname = '127.0.0.1'
//const port = 3000;

//app.set('port', port);

app.use(express.json());

app.use('/api', spoilersRoute);

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

//const server = http.createServer(app);

//server.listen(port, hostname, () => {
  //  console.log(`Servidor em execução em http://${hostname}:${port}/`);
//});

sequelize.sync({ force: true }).then(() => {
    const port = process.env.PORT || 3000;

    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port);
});
//utilize o force: true somente na primeira vez que
//for iniciar a aplicação, depois disso, remover para
//manter os dados gravados do banco de dados !