import jwt from "jsonwebtoken";


export default function autorizarAdmin(req, res, next){
    const authHeader = req.headers['authorization']

if (authHeader == null){
    res.status(401).json({
        msg: "Você precisa estar logado!"
    })
}

    const token = authHeader.split(' ')[1]


    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, usuario) => {
            const role = usuario.role
            if(err || role == false) {
                return res.sendStatus(401).json({
                    msg: "Você precisa ser um Admin para acessar aqui!"
                })
            }

            next()



        })


    } else {
        res.status(401).json({
            msg: "Você precisa estar logado!"
        })
    }

}