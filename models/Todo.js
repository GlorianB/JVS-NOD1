const path = require('path');
const Promise = require('bluebird');

// On passe par bluebird pour travailler avec des async/await sur fs
const fs = Promise.promisifyAll(require('fs'));

// Le path du fichier data.json
const p = path.join(process.cwd(), 'data', 'data.json');

// On exporte une classe Todo
module.exports = class Todo {
    constructor(name) {
        this.name = name;
    };

    // Methode save asynchrone -> nous permet d'utiliser le mot cle await
    async save() {
        try {
          const todos = await fs.readFileAsync(p);
          const parseTodos = JSON.parse(todos);
          parseTodos.push(this);
          await fs.writeFileAsync(p, JSON.stringify(parseTodos));
          return true;
        } catch (e) {
          console.error(e);
        }
    };

    //Methode fetchAll asynchrone statique
    static async fetchAll() {
        try {
          const todos = await fs.readFileAsync(p);
          return JSON.parse(todos);
        } catch (e) {
          console.error(e);
        }
    };
};
