import db from "./SQLiteDatabaseService";

const AdminService = {

    addCripto: (cript) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS criptos (id INTEGER PRIMARY KEY AUTOINCREMENT, id_api TEXT NOT NULL, nome_cripto TEXT NOT NULL, periculosidade TEXT NOT NULL, img_url TEXT NOT NULL, symbol TEXT NOT NULL);",
                    [],
                    () => {
                        tx.executeSql(
                            "INSERT INTO criptos (id_api, nome_cripto, periculosidade, img_url, symbol) VALUES (?, ?, ?, ?, ?);",
                            [cript.id_api, cript.nome_cripto, cript.periculosidade, cript.img_url, cript.symbol],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log("Inseriu a cripto => " + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject("Erro ao inserir dados: " + JSON.stringify(cript));
                                }
                            },
                            (_, error) => reject(error)
                        );
                    },
                    (error) => reject(error)
                );
            });
        });
    },

    getAllCriptos: () => {
        return new Promise((resolve, reject) => {
            db.transaction(async (tx) => {
                try {
                    const result = await new Promise((resolve, reject) => {
                        tx.executeSql(
                            "SELECT * FROM criptos;",
                            [],
                            (_, { rows }) => {
                                const criptos = Array.from(rows).map(row => row);
                                console.log('As criptos retornadas foram: ', criptos);
                                resolve(criptos);
                            },
                            (_, error) => reject(error)
                        );
                    });

                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });
    },
      

    updateCripto: (cript) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE criptos SET periculosidade = ? WHERE id = ?;",
                    [cript.periculosidade, cript.id],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            resolve();
                        } else {
                            reject("Erro ao atualizar cripto");
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    getCriptoByIdApi: (idApi) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM criptos WHERE id_api = ?;",
                    [idApi],
                    (_, { rows }) => {
                        const cripto = rows._array[0];
                        resolve(cripto);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    deleteCripto: (id) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM criptos WHERE id_api = ?;",
                    [id],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            resolve();
                        } else {
                            reject("Erro ao excluir cripto");
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    deleteAllCriptos: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "DELETE FROM criptos;",
                    [],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            resolve();
                        } else {
                            reject("Erro ao excluir todas as criptos");
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    deleteCriptoTable: () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "DROP TABLE criptos;",
                    [],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            resolve();
                        } else {
                            reject("Erro ao excluir tabela criptos");
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },
};

export default AdminService;
