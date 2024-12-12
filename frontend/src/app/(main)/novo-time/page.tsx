'use client';

import { useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import PokemonCard from '@/components/PokemonCardSelect';
import CardVazio from '@/components/CardVazio';
import Image from 'next/image';
import Search from '/public/img/search.svg';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import PokemonType from '@/types/pokemonType';

type Pokemon = {
    id: number;
    nome: string;
    tipos: PokemonType[];
    img: string;
    numero: number;
};

export default function NovoTime() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
    const [teamName, setTeamName] = useState('');
    const [selectedPokemonForTeam, setSelectedPokemonForTeam] = useState<Pokemon | null>(null);

    // Fetch Pokémon based on search term
    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/pokemon', {
                params: { nome: searchTerm }
            });
            setPokemonList(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar Pokémons:', error);
            setPokemonList([]);
        }
    };

    // Select Pokémon for team
    const selectPokemonForTeam = (pokemon: Pokemon) => {
        setSelectedPokemonForTeam(pokemon);
    };

    // Add Pokémon to team
    const addPokemonToTeam = () => {
        if (selectedPokemonForTeam && selectedPokemons.length < 6) {
            setSelectedPokemons([...selectedPokemons, selectedPokemonForTeam]);
            setPokemonList(pokemonList.filter(p => p.id !== selectedPokemonForTeam.id));
            setSelectedPokemonForTeam(null);
        }
    };

    // Remove Pokémon from team
    const removePokemonFromTeam = (pokemon: Pokemon) => {
        const newSelectedPokemons = selectedPokemons.filter(p => p.id !== pokemon.id);
        setSelectedPokemons(newSelectedPokemons);
        setPokemonList([...pokemonList, pokemon]);
    };

    // Save team
    const handleSaveTeam = async () => {
        try {
            const userId = 1; // Replace with actual user ID retrieval

            const response = await axios.post('/api/times', {
                nome: teamName,
                nome1: selectedPokemons[0]?.nome || null,
                nome2: selectedPokemons[1]?.nome || null,
                nome3: selectedPokemons[2]?.nome || null,
                nome4: selectedPokemons[3]?.nome || null,
                nome5: selectedPokemons[4]?.nome || null,
                nome6: selectedPokemons[5]?.nome || null,
                usuario: userId
            });

            alert('Time criado com sucesso!');
            // Optional: reset form or navigate
        } catch (error) {
            console.error('Erro ao criar time:', error);
            alert('Erro ao criar time');
        }
    };

    return (
        <div className="h-screen flex">
            <section className="flex items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
                <div className="flex flex-col items-start gap-2">
                    <h2 className="text-2xl font-bold">Pokemons</h2>
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-2 py-1 rounded-md"
                        />
                        <Button color="orange" onClick={handleSearch}>
                            <Image src={Search} alt="buscar" width={16} />
                        </Button>
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                        {pokemonList.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                variant="sm"
                                nome={pokemon.nome}
                                img={pokemon.img}
                                tipos={pokemon.tipos}
                                numero={pokemon.numero}
                                showSelectButton={true}
                                onSelect={() => selectPokemonForTeam(pokemon)}
                                isSelected={selectedPokemonForTeam?.id === pokemon.id}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Transfer Section */}
            <div className="flex flex-col justify-center items-center px-4">
                {selectedPokemonForTeam && selectedPokemons.length < 6 && (
                    <button 
                        onClick={addPokemonToTeam}
                        className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition"
                    >
                        <ChevronRightIcon size={24} />
                    </button>
                )}
            </div>

            <section className="flex flex-col items-center gap-4 h-fit max-w-6xl m-auto p-8 bg-blue-100/75 border-2 border-slate-300 rounded-xl w-fit">
                <div className="flex flex-col items-start gap-4">
                    <h2 className="text-2xl font-bold">Time</h2>
                    <input
                        type="text"
                        id="team-name"
                        name="team-name"
                        placeholder="Nome do Time"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="p-2 bg-white/75 rounded-lg w-64"
                    />
                    <div className="grid grid-flow-col grid-rows-2 gap-4">
                        {selectedPokemons.map((pokemon, index) => (
                            <PokemonCard
                                key={pokemon.id}
                                variant="sm"
                                nome={pokemon.nome}
                                img={pokemon.img}
                                tipos={pokemon.tipos}
                                numero={pokemon.numero}
                                onSelect={() => removePokemonFromTeam(pokemon)}
                                showSelectButton={true}
                            />
                        ))}
                        {[...Array(6 - selectedPokemons.length)].map((_, index) => (
                            <CardVazio key={`empty-${index}`} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-end w-full">
                    <Button 
                        color="blue" 
                        onClick={handleSaveTeam}
                        disabled={selectedPokemons.length === 0 || !teamName}
                    >
                        Salvar
                    </Button>
                </div>
            </section>
        </div>
    );
}