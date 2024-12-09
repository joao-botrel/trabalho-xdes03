import express from 'express'
import usuarioRouter from './routes/usuarios.routes.js'
import pokemonRouter from './routes/pokemon.routes.js'
import favoritoRouter from './routes/favoritos.routes.js'
import timeRouter from './routes/times.routes.js'

const app = express()
const port = 3000
app.use(express.json());

app.use('/', usuarioRouter)
app.use('/', pokemonRouter)
app.use('/', favoritoRouter)
app.use('/', timeRouter)

app.listen(port, () => {
    console.log(`A API está rodando na porta ${port}`)
})

