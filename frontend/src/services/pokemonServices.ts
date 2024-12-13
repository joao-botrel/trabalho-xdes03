import axios from 'axios';

// Tipando os tipos dos dados esperados da API
interface FlavorTextEntry {
  language: { name: string };
  flavor_text: string;
}

interface Genus {
  language: { name: string };
  genus: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
  species: { url: string };
}

interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
}


const adicionarPokemons = async () => {
    try {
        // 1. Obter lista de Pokémon entre 101 e 200
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=100`);
        const listaPokemons = response.data.results;

        const listaParaEnvio: any[] = []; // Lista para armazenar os pokémons a serem enviados

        // 2. Processar cada Pokémon
        for (const pokemon of listaPokemons) {
            // Obter detalhes do Pokémon
            const detalhesResponse = await axios.get<PokemonDetails>(pokemon.url);
            const detalhes = detalhesResponse.data;

            // Obter dados adicionais da espécie
            const especieResponse = await axios.get<PokemonSpecies>(detalhes.species.url);
            const especie = especieResponse.data;

            // Pegar a descrição (flavor_text) em inglês
            const descricao = especie.flavor_text_entries.find((entry: FlavorTextEntry) => entry.language.name === 'en')?.flavor_text || 'Descrição não encontrada';

            // Pegar a categoria (genus)
            const categoria = especie.genera.find((genus: Genus) => genus.language.name === 'en')?.genus || 'Categoria não encontrada';

            // Montar objeto para envio
            const pokemonData = {
                numero: detalhes.id,
                nome: detalhes.name,
                tipo1: detalhes.types[0]?.type.name || null,
                tipo2: detalhes.types[1]?.type.name || null,
                gen: calcularGeracao(detalhes.id),
                descricao: descricao.replace(/\n|\f/g, ' '), // Remover quebras de linha
                foto: detalhes.sprites.other['official-artwork'].front_default,
                categoria: categoria,
            };

            listaParaEnvio.push(pokemonData);
        }

        // Enviar todos os Pokémon em uma única requisição
        const respostaBackEnd = await axios.post('http://localhost:3005/pokemon', listaParaEnvio);
        console.log(respostaBackEnd.data.msg);
    } catch (error: any) {
        console.error('Erro ao adicionar Pokémon:', error.message);
    }
};

// Função para calcular a geração com base no número do Pokémon
const calcularGeracao = (numero: number): number => {
    if (numero <= 151) return 1;  // Gen 1
    if (numero <= 251) return 2;  // Gen 2
    if (numero <= 386) return 3;  // Gen 3
    if (numero <= 493) return 4;  // Gen 4
    if (numero <= 649) return 5;  // Gen 5
    if (numero <= 721) return 6;  // Gen 6
    if (numero <= 809) return 7;  // Gen 7
    if (numero <= 898) return 8;  // Gen 8
    return 9;  // Gen 9 e superiores
};

export default adicionarPokemons;
