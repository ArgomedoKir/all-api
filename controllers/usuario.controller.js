
const mysql = require('../conexion');
const bcryptjs = require('bcryptjs');



const crearUsuario = async (req, res)=>{

    console.log(req.body);
    
    let contraseniaHash = await bcryptjs.hashSync(req.body.USU_CONTRASENIA, 8);

    const {USU_NOMBRES,USU_DNI, USU_APELLIDOS,USU_EMAIL, USU_ALIAS, USU_DIRECCION,
        USU_SEXO,USU_FECH_NAC } = req.body;

    const USU_CONTRASENIA = contraseniaHash;

    const query = `CALL INSERT_USUARIO(?,?,?,?,?,?,?,?,?);`;
        
    mysql.query(query, [USU_NOMBRES,USU_DNI,USU_APELLIDOS, USU_EMAIL,USU_ALIAS,USU_DIRECCION,
        USU_SEXO,USU_FECH_NAC,USU_CONTRASENIA ], (err, result) => {
            if(!err){
                res.status(201).json({"status":201, "mensaje":"Solicitud exitosa."});
            }else{
                console.log(err);
                res.status(400).json({"status":400,"mensaje":"Hubo un error en la conexión con la BD."});
            }
    } )
};


const verificarUsuario = async (req, res)=>{
    const {USU_ALIAS, USU_CONTRASENIA} = req.body;

    let P_ENCRYPTED_CONTRASENIA = ""; // 0 significa que no se encontrarón sus credenciales, por lo tanto no es usuario de la app. 

    const query = 'CALL VALIDAR_USUARIO(?, @P_ENCRYPTED_CONTRASENIA);';
    const query2 = 'SELECT @P_ENCRYPTED_CONTRASENIA;';

    mysql.query(query, [USU_ALIAS], (err, result) => {
            if(!err){
                mysql.query(query2, (err, result) => {
                    if(!err){

                        P_ENCRYPTED_CONTRASENIA = result[0]["@P_ENCRYPTED_CONTRASENIA"];
                        
                        // Bcrypt compara la contraseña enviada con la encriptda en la bd
                        if(bcryptjs.compareSync(USU_CONTRASENIA, P_ENCRYPTED_CONTRASENIA) == false){
                            res.status(400).json({"status":400,"mensaje":"Credenciales incorrectas o no existe el usuario."});
                        } else{
                            res.status(200).json({"status":200, "mensaje":"Las credenciales coinciden."});
                        }

                    }else{
                        res.status(500).json({"status":500,"mensaje":"Hubo un error con la consulta en la BD."});
                    }
                } )
            }else{
                res.status(500).json({"status":500,"mensaje":"Hubo un error con la consulta en la BD."});
            }
    } );
}


module.exports = {verificarUsuario, crearUsuario} ;

