import db from "./SQLiteDatabaseService";

const UserService = {
    // Criando método e tabela de Cliente ---------------------
    addCliente: (email) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL)',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO clientes (email) VALUES (?);',
                            [email],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o cliente => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(cliente));
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

    // Criando método e tabela de Admin -----------------------
    addAdministrador: (email) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS administradores (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL);',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO administradores (email) VALUES (?);',
                            [email],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o administrador => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(administrador));
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

    // Criando tabela e métodos de Usuário --------------------
    addUsuario: (usuario) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, senha TEXT NOT NULL, tipo TEXT NOT NULL, id_pessoa INTEGER NOT NULL)',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO usuarios (login, senha, tipo, id_pessoa) VALUES (?, ?, ?, ?)',
                            [usuario.login, usuario.senha, usuario.tipo, usuario.id_pessoa],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o usuário => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(usuario));
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

    addFirstCliente: () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL)',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO clientes (email) VALUES (\'nathan@gmail.com\');',
                            [],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o cliente => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(cliente));
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

    addFirstAdministrador: () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS administradores (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL);',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO administradores (email) VALUES (\'admin@admin.com\');',
                            [],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o administrador => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(administrador));
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

    addFirstUsuario: () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, senha TEXT NOT NULL, tipo TEXT NOT NULL, id_pessoa INTEGER NOT NULL)',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO usuarios (login, senha, tipo, id_pessoa) VALUES (\'nathan@gmail.com\', \'nathan\', \'CLIENTE\', 1)',
                            [],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o usuário => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(usuario));
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

    addSecondUsuario: () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, senha TEXT NOT NULL, tipo TEXT NOT NULL, id_pessoa INTEGER NOT NULL)',
                    [],
                    () => {
                        tx.executeSql(
                            'INSERT INTO usuarios (login, senha, tipo, id_pessoa) VALUES (\'admin@admin.com\', \'admin\', \'ADMIN\', 1)',
                            [],
                            (_, result) => {
                                if (result.rowsAffected > 0) {
                                    console.log('Inseriu o usuário => ' + result.insertId);
                                    resolve(result.insertId);
                                } else {
                                    reject('Erro ao inserir dados: ' + JSON.stringify(usuario));
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

    getUsuario: (login, senha) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM usuarios WHERE login = ? AND senha = ?',
                    [login, senha],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            const usuario = result.rows.item(0);
                            resolve(usuario);
                        } else {
                            resolve(null);
                        }
                    },
                    (_, error) => reject(error)
                );
            });
        });
    },


};

export default UserService;
