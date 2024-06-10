# Projeto api-rest com MongoDb
## Descrição
Este repositório contém um projeto desenvolvido pelo Professor Bruno Catão em colaboração com os alunos Hianra Alves e Luis Rodrigues. O objetivo deste projeto é demonstrar como configurar e executar um ambiente de desenvolvimento local para o MongoDB e fornecer os passos necessários para iniciar o projeto.

## Passo a Passo para Rodar o Projeto

1. **Instalação do Docker:**
   - Certifique-se de ter o Docker instalado em seu sistema. Se ainda não o tiver, você pode baixá-lo no [site oficial do Docker](https://www.docker.com/get-started).

2. **Execução do Container MongoDB:**
   - Execute o seguinte comando para iniciar um container MongoDB localmente:
     ```shell
     docker run --name "nome-da-sua-preferencia" -d -p 27017:27017 mongo:latest
     ```
     Substitua `"nome-da-sua-preferencia"` pelo nome que você preferir para o container MongoDB. Este comando baixará a imagem mais recente do MongoDB e iniciará um container com as configurações padrão.

3. **Iniciar o Container MongoDB:**
   - Após a execução do comando acima, você pode iniciar o container com o seguinte comando:
     ```shell
     docker start "nome-da-sua-preferencia"
     ```
     Certifique-se de usar o mesmo nome que você definiu no comando anterior.

4. **Verificar o Status do Container:**
   - Você pode verificar se o container MongoDB está em execução executando o seguinte comando:
     ```shell
     docker ps
     ```

5. **Configuração do Projeto:**
   - Para configurar o projeto localmente, siga estas etapas:
     - Execute `npm install` para instalar as dependências do projeto.
     - Execute `npm run start` para iniciar o projeto.

Agora, você está pronto para começar a trabalhar no projeto MongoDB com base nas configurações fornecidas por este repositório. Certifique-se de seguir todas as etapas cuidadosamente para garantir um ambiente de desenvolvimento adequado.


Descrição gerada pelo chatgpt.
