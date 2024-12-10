import express from 'express'
import * as pokemonController from '../controllers/pokemon.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'
import autorizarAdmin from '../Middlewares/admin.middlewares.js'

const router = express.Router()

router.post('/pokemon', pokemonController.criarPokemon); 
router.get('/pokemon', autorizarUsuario, pokemonController.getPokemons); 
router.get('/pokemon/numero/:numero', autorizarUsuario, pokemonController.getPokemonPorId); 
router.get('/pokemon/tipo', autorizarUsuario, pokemonController.getPokemonsPorTipo);  
router.get('/pokemon/gen/:gen', autorizarUsuario, pokemonController.getPokemonPorGen); 
router.put('/pokemon/:pokemonId', pokemonController.atualizarPokemon); 
router.delete('/pokemon/:pokemonId', pokemonController.deletarPokemon);

export default router