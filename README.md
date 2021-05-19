# BbusterFlix
API para locar/buscar filmes na Locadora-Online

## Requisitos

*Node JS*
*Mysql*
*Redis*

## Executar o Projeto
1. Criar um arquivo .env na raíz do projeto
2. Criar o banco de dados no MYSQL com o nome setado no .env
3. Acessar a pasta do projeto e rodar ```npm i ```
  - Executar os migrations para criação das tabelas ```npm run migration```
  - Executar os seeds para popular as tabelas ```npm run seed```
  - Executar o projeto ```npm start```
  - Pronto o projeto estará rodando na porta que foi setada no .env 
  - Esta é a URL raíz de Acesso ```http://localhost:PORTA/api/bbFlix/ ``` 
  - Rodar o Redis localmente
4. Executar o Redis
 - Existe um docker-compose com a imagem do redis para não rodar um redis localmente
    - ```docker-compose up -d ```

## Rota para Usuários

**Método POST**
*/create/user* - Criará um novo usuário
  - Exemplo para criação do usuário
```json
  {
	"username": "username",
	"email": "email@email.com",
	"password": "password"
}
```

*/login* - Para fazer o login na API
  - Exemplo para fazer o login do usuário
```json
  {
	"email": "email@email.com",
	"password": "password"
}
```

*/logout* - Para fazer o logout na API


## Rota para os Filmes

**Método PUT**
*/movies/rent/:id* - Para fazer um aluguel de um Filme
  - Exemplo para alugar um filme usando axios no front
  **token** = recuperado da rota */login*
```json
{
  "method": "put",
  "url": "/movies/rent/:id",
  "headers": {
    "Authorization": "Bearer + token",
    "Content-Type": "application/json"
  }
}
```

*/movies/giveBack/:id* - Para devolver um aluguel de um Filme
  - Exemplo para devolver um filme usando axios no front
  **token** = recuperado da rota */login*
```json
{
  "method": "put",
  "url": "/movies/giveBack/:id",
  "headers": {
    "Authorization": "Bearer + token",
    "Content-Type": "application/json"
  }
}
```

**Método GET**
*/movies* - Método para listar os filmes


*/movies* - Método para listar os filmes buscando pelo nome do título
- Exemplo para buscar um filme pelo seu titulo no body da requisição **req.body.titulo**
  - *Não esquecendo do token* conforme os exemplos acima
```json
{
	"titulo": "Batman Begins"
}
```

## Criar filmes no banco
 - Acessar a base de dados e rodar o script abaixo como exemplo conforme o necessário
 ```sql
  INSERT INTO movies (titulo,diretor,createdAt, updatedAt) VALUES('Army of the Dead: Invasão em Las Vegas', 'Zack Snyder', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
 ```

 ## Exemplo de um arquivo .env
  ```
  PORT=3000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=root
  DATABASE=bbuster_flix
  DB_PORT=3306
  TOKEN_SECRET=Um4S3nh4MU1t0F0rt3
  PASSWORD_LOCAL=minhaSenhaLocal
  REDIS_HOST=0.0.0.0
  REDIS_PORT=6379
  ```

 ## Libs Usadas

* Sequelize
* Express
* mysql2
