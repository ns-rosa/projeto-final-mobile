import db from "./SQLiteDatabaseService";

const ClienteService = {

    // Criando tabela e métodos de RegistroCarteiras ----------
    addRegistroCarteira: (cript) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS registro_carteiras (id INTEGER PRIMARY KEY AUTOINCREMENT, id_cliente INTEGER NOT NULL, id_api TEXT NOT NULL, nome_cripto TEXT NOT NULL, periculosidade TEXT NOT NULL, img_url TEXT NOT NULL, symbol TEXT NOT NULL, valor DOUBLE NOT NULL);',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO registro_carteiras (id_cliente, id_api, nome_cripto, periculosidade, img_url, symbol, valor) VALUES (?, ?, ?, ?, ?, ?, ?);',
                            [cript.id_cliente, cript.id_api, cript.nome_cripto, cript.periculosidade, cript.img_url, cript.symbol, cript.valor],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o registro de carteira => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(cript));
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

    getRegistrosCarteiraPorCliente: (idCliente) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM registro_carteiras WHERE id_cliente = ?;',
                    [idCliente],
                    (_, result) => {
                        const registrosCarteira = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            const row = result.rows.item(i);
                            registrosCarteira.push(row);
                        }
                        resolve(registrosCarteira);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    getAllCriptos: () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM criptos;",
                    [],
                    (_, { rows }) => {
                        const criptos = Array.from(rows).map(row => row);
                        console.log(criptos)
                        resolve(criptos);
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

    deleteRegistroCarteiraPorClienteEPorIdCripto: (idCliente, idCripto) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM registro_carteiras WHERE id_cliente = ? AND id_api = ?;',
                    [idCliente, idCripto],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            resolve('Registro de carteira excluído com sucesso');
                        } else {
                            reject('Nenhum registro de carteira correspondente encontrado');
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },

    updateCripto: (cript) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE registro_carteiras SET periculosidade = ?, valor = ? WHERE id = ?;',
                    [cript.periculosidade, cript.valor, cript.id],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            console.log('Atualizou o registro de carteira => ' + cript.id);
                            resolve();
                        } else {
                            reject('Erro ao atualizar dados: ' + JSON.stringify(cript));
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
    

};

export default ClienteService;
