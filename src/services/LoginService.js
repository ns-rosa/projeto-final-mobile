import db from "./Services/SQLiteDatabaseService";

const LoginService = {
    idUsuarioAtivo: null,
    
    setUsuarioAtivo: function(idUsuario) {
        this.idUsuarioAtivo = idUsuario;
    },
  
    getUsuarioAtivo: function() {
        return this.idUsuarioAtivo;
    },

    getListaUsuarios: () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM usuarios;',
                    [],
                    (_, result) => {
                        const usuarios = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            const usuario = result.rows.item(i);
                            usuarios.push(usuario);
                        }
                        resolve(usuarios);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });
    },

    getDadosUsuarioByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM usuarios WHERE login = ?;',
                    [email],
                    (_, result) => {
                        if (result.rows.length === 1) {
                            const usuario = result.rows.item(0);
                            resolve(usuario);
                        } else {
                            resolve(null); // Não encontrou um usuário com o email fornecido
                        }
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        });
    }
};

export default LoginService;

