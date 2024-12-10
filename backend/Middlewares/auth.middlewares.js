import jwt from "jsonwebtoken";

export default function autorizarUsuario(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Verifica se o cabeçalho de autorização está presente
    if (authHeader == null) {
        return res.status(401).json({
            msg: "Você precisa estar logado!"
        });
    }

    // Extrai o token do cabeçalho
    const token = authHeader.split(' ')[1];

    // Verifica se o token existe
    if (!token) {
        return res.status(401).json({
            msg: "Você precisa estar logado!"
        });
    }

    // Verifica a validade do token
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(401).json({
                msg: "Token inválido ou expirado!"
            });
        }

        // Token válido: Anexa informações do usuário à requisição e segue para o próximo middleware
        req.user = usuario;
        next();
    });
}
