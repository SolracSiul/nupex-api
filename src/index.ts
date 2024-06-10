import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import customServer from './graphql/graphqlServer';
import { getIp } from 'get-my-own-ip';
const app = express();
const port = 3001;
let ad = getIp();
app.use("/files", express.static("files"))

mongoose.connect(`mongodb://${ad}/apipost`, {})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
    console.log('recuperei a porta', ad)
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB: ' + error);
  });

async function startApolloServer() {
    await customServer.start();
    customServer.applyMiddleware({ app });
  }

startApolloServer();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
