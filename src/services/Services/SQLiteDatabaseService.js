import * as SQLite from "expo-sqlite";

// Abrindo a DB do projeto e exportando para utilizar em outros services
const db = SQLite.openDatabase("carteira-cripto.db");

export default db;