import express from 'express'
import usuarioRouter from './routes/usuario.routes.js'

const app = express()
const port = 3000


app.use('/', usuarioRouter)

app.listen(port, () => {
    console.log(`A API está rodando na porta ${port}`)
})

