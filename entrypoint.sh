npm install
npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:all
npm start
