const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/planeje');
    console.log('Conectado ao banco!');
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main;
