import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('carteira-cripto.db');

const sqlDropTableClientes = 'DROP TABLE IF EXISTS clientes;'
const sqlDropTableAdmins = 'DROP TABLE IF EXISTS administradores;'
const sqlDropTableUsuarios = 'DROP TABLE IF EXISTS usuarios;'
const sqlDropTableCriptos = 'DROP TABLE IF EXISTS criptos;'
const sqlDropTableCarteiras = 'DROP TABLE IF EXISTS carteiras;'
const sqlDropTableAtivosCarteiras = 'DROP TABLE IF EXISTS ativos_carteiras;'

const sqlTableClientes = 'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL);'
const sqlTableCriptos = 'CREATE TABLE IF NOT EXISTS criptos (id INTEGER PRIMARY KEY AUTOINCREMENT, id_api TEXT NOT NULL, nome_cripto TEXT NOT NULL, periculosidade TEXT NOT NULL);'
const sqlTableCarteiras = 'CREATE TABLE IF NOT EXISTS carteiras (id INTEGER PRIMARY KEY AUTOINCREMENT, id_cliente INTEGER NOT NULL);'
const sqlTableAtivosCarteira = 'CREATE TABLE IF NOT EXISTS ativos_carteiras (id INTEGER PRIMARY KEY AUTOINCREMENT, id_cliente TEXT NOT NULL, id_cripto TEXT NOT NULL, valor DOUBLE);'
const sqlTableAdmins = 'CREATE TABLE IF NOT EXISTS administradores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL);'
const sqlTableUsuarios = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL, senha TEXT NOT NULL, tipo TEXT NOT NULL, id_pessoa INTEGER NOT NULL);'

const iniciarDatabase = () => {
    // Inicia a database primeiro deletando todos os registros anteriores    
    db.transaction((tx) => {
        tx.executeSql(sqlDropTableClientes, [],
            () => {
                console.log("Tabela clientes deletada com sucesso")
            },
            (error) => {
                console.log("Erro ao deletar tabela clientes")
            });
        tx.executeSql(sqlDropTableAdmins, [],
            () => {
                console.log("Tabela administradores deletada com sucesso")
            },
            (error) => {
                console.log("Erro ao deletar tabela administradores")
            });
        tx.executeSql(sqlDropTableUsuarios, [],
            () => {
                console.log("Tabela usuarios deletada com sucesso")
            },
            (error) => {
                console.log("Erro ao deletar tabela usuarios")
            });
        tx.executeSql(sqlDropTableCarteiras, [],
            () => {
                console.log("Tabela carteiras deletada com sucesso")
            },
            (error) => {
                console.log("Erro ao deletar tabela carteiras")
            });
        tx.executeSql(sqlDropTableCriptos, [],
            () => {
                console.log("Tabela criptos deletada com sucesso")
            },
            (error) => {
                console.log("Erro ao deletar tabela criptos")
            });
        tx.executeSql(sqlDropTableAtivosCarteiras, [],
            () => {
                console.log("Tabela ativos_carteiras deletada com sucesso")
            },
            (error) => {
                console.log("Erro ao deletar tabela ativos_carteiras")
            });

    })

    // CRIAÇÃO DE TODAS AS TABELAS DO BANCO DE DADOS
    db.transaction((tx) => {
        // Cria a tabela de clientes
        tx.executeSql(sqlTableClientes,
            [],
            () => {
                console.log('Tabela de clientes criada com sucesso');
                tx.executeSql(
                    'INSERT INTO clientes (nome, email) VALUES (\'Nathan dos Santos Rosa\', \'nathan.sr6@gmail.com\');',
                    [],
                    (_, result) => {
                        console.log('Cliente criado com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao criar cliente:', error);
                    }
                );
            },
            (error) => {
                console.log('Erro ao criar tabela de usuários:', error);
            }
        );
    });

    db.transaction((tx) => {
        // Cria a tabela de administradores
        tx.executeSql(sqlTableAdmins,
            [],
            () => {
                console.log('Tabela de administradores criada com sucesso');
                tx.executeSql(
                    'INSERT INTO administradores (nome, email) VALUES (\'João Francisco\', \'admin@admin.com\');',
                    [],
                    (_, result) => {
                        console.log('administrador criado com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao criar administrador:', error);
                    }
                );
            },
            (error) => {
                console.log('Erro ao criar tabela de administradores:', error);
            }
        );
    });

    db.transaction((tx) => {
        // Cria a tabela de usuários contendo um administrador e um cliente
        tx.executeSql(sqlTableUsuarios,
            [],
            () => {
                console.log('Tabela de usuários criada com sucesso');
                tx.executeSql(
                    'INSERT INTO usuarios (login, senha, tipo, id_pessoa) VALUES (\'nathan.sr6@gmail.com\', \'nathan\', \'CLIENTE\', 1);',
                    [],
                    (_, result) => {
                        console.log('Usuário criado com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao criar usuário:', error);
                    }
                );
                tx.executeSql(
                    'INSERT INTO usuarios (login, senha, tipo, id_pessoa) VALUES (\'admin@admin.com\', \'admin\', \'ADMIN\', 1);',
                    [],
                    (_, result) => {
                        console.log('Usuário criado com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao criar usuário:', error);
                    }
                );
            },
            (error) => {
                console.log('Erro ao criar tabela de usuários:', error);
            }
        );
    });


    db.transaction((tx) => {
        // Cria a tabela de criptos
        tx.executeSql(sqlTableCriptos,
            [],
            () => {
                console.log('Tabela de criptos criada com sucesso');
                tx.executeSql(
                    'INSERT INTO criptos (id_api, nome_cripto, periculosidade) VALUES (\'bitcoin\', \'Bitcoin\', \'Baixa\');',
                    [],
                    (_, result) => {
                        console.log('Cripto adicionada com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao adicionar Cripto:', error);
                    }
                );
            },
            (error) => {
                console.log('Erro ao criar tabela de criptos:', error);
            }
        );
    });

    db.transaction((tx) => {
        // Cria a tabela de carteiras
        tx.executeSql(sqlTableCarteiras,
            [],
            () => {
                console.log('Tabela de carteiras criada com sucesso');
                tx.executeSql(
                    'INSERT INTO carteiras (id_cliente) VALUES (1);',
                    [],
                    (_, result) => {
                        console.log('Registro de carteira adicionada com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao adicionar carteira:', error);
                    }
                );
            },
            (error) => {
                console.log('Erro ao criar tabela de carteiras:', error);
            }
        );
    });

    db.transaction((tx) => {
        // Cria os registros de moeda existentes na carteira
        tx.executeSql(sqlTableAtivosCarteira,
            [],
            () => {
                console.log('Tabela de ativos_carteiras criada com sucesso');
                tx.executeSql(
                    'INSERT INTO ativos_carteiras (id_cliente, id_cripto, valor) VALUES (1, 1, 0.05);',
                    [],
                    (_, result) => {
                        console.log('Registro de carteira adicionada com sucesso. ID:', result.insertId);
                    },
                    (error) => {
                        console.log('Erro ao adicionar ativos_carteira:', error);
                    }
                );
            },
            (error) => {
                console.log('Erro ao criar tabela de ativos_carteira:', error);
            }
        );
    });

};

const deletarDatabase = () => {
    db.transaction((tx) => {
        // deleta todas as tabelas
        tx.executeSql('DROP TABLE IF EXISTS usuarios;',
            [],
            () => {
                console.log('tabela usuarios deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela usuarios', error);
            }
        );
        tx.executeSql('DROP TABLE IF EXISTS criptos;',
            [],
            () => {
                console.log('tabela criptos deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela criptos', error);
            }
        );
        tx.executeSql('DROP TABLE IF EXISTS carteiras;',
            [],
            () => {
                console.log('tabela carteiras deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela carteiras', error);
            }
        );
        tx.executeSql('DROP TABLE IF EXISTS administradores;',
            [],
            () => {
                console.log('tabela admin deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela admin', error);
            }
        );
        tx.executeSql('DROP TABLE IF EXISTS clientes;',
            [],
            () => {
                console.log('tabela clientes deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela clientes', error);
            }
        );
        tx.executeSql('DROP TABLE IF EXISTS ativos_carteiras;',
            [],
            () => {
                console.log('tabela ativos_carteiras deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela ativos_carteiras', error);
            }
        );
        tx.executeSql('DROP TABLE IF EXISTS registro_carteiras;',
            [],
            () => {
                console.log('tabela registro_carteiras deletada com sucesso');
            },
            (error) => {
                console.log('Erro ao deletar tabela registro_carteiras', error);
            }
        );
    });
}

export { iniciarDatabase, deletarDatabase };
export default db;

