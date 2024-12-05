import express from 'express'
import usuarioRouter from './routes/usuarios.routes.js'
import pokemonRouter from './routes/pokemon.routes.js'

const app = express()
const port = 3000
app.use(express.json());

app.use('/', usuarioRouter)
app.use('/', pokemonRouter)

app.listen(port, () => {
    console.log(`A API está rodando na porta ${port}`)
})

