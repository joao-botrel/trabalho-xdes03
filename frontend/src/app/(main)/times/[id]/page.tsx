'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import PokemonCard from '@/components/PokemonCardSelect';
import CardVazio from '@/components/CardVazio';
import Image from 'next/image';
import Search from '/public/img/search.svg';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import PokemonType from '@/types/pokemonType';
import PokemonCardDelete from '@/components/PokemonCardDelete';
import { useParams } from 'next/navigation';
import router from 'next/router';

type Pokemon = {
    id: number;
    nome: string;
    tipo1: PokemonType;
    tipo2: PokemonType;
    foto: string;
    numero: number;
};

export default function NovoTime() {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
    const [teamName, setTeamName] = useState('');
    const [selectedPokemonForTeam, setSelectedPokemonForTeam] = useState<Pokemon | null>(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            try {
                const response = await axios.get('http://localhost:3005/pokemon', { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
                const time = await axios.get('http://localhost:3005/times/id/' + id, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
                setTeamName(time.data.data.nomeTime);
                var pokemonsId: Number[] = [];
                pokemonsId.push(time.data.data.nome1!, time.data.data.nome2!, time.data.data.nome3!, time.data.data.nome4!, time.data.data.nome5!, time.data.data.nome6!);
                var pokemonsList: Pokemon[] = [];
                for (var i = 0; i < 6; i++) {
                    const pokemon = await axios.get(`http://localhost:3005/pokemon/numero/${pokemonsId[i]}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
                    console.log(pokemon.data.data);
                    pokemonsList.push(pokemon.data.data);
                }

                setSelectedPokemons(pokemonsList);
                const unselectedPokemons: Pokemon[] = response.data.data.filter(
                    (pokemon: Pokemon) => !pokemonsList.some((selected: Pokemon) => selected.id === pokemon.id)
                );
                setAllPokemons(unselectedPokemons);
                setFilteredPokemons(unselectedPokemons);

                setSelectedPokemonForTeam(null);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    window.location.href = '/splash'; // Redireciona para a página inicial
                }
                console.error('Erro ao buscar todos os Pokémons:', error);
            }
        };
        fetchAllPokemons();
    }, []);

    useEffect(() => {
        const fetchUnselectedPokemons = async () => {
            try {
                const response = await axios.get('http://localhost:3005/pokemon', { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
                const unselectedPokemons: Pokemon[] = response.data.data.filter(
                    (pokemon: Pokemon) => !selectedPokemons.some((selected: Pokemon) => selected.id === pokemon.id)
                );
                setAllPokemons(unselectedPokemons);
                setFilteredPokemons(unselectedPokemons);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    window.location.href = '/splash'; // Redireciona para a página inicial
                }
                console.error('Erro ao buscar todos os Pokémons:', error);
            }
        };
        fetchUnselectedPokemons();
    }, [update]);



    useEffect(() => {
        const filtered = allPokemons.filter(pokemon =>
            pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemons(filtered);
    }, [searchTerm, allPokemons]);

    const selectPokemonForTeam = (pokemon: Pokemon) => {
        setSelectedPokemonForTeam(pokemon);
    };

    const addPokemonToTeam = () => {
        if (selectedPokemonForTeam && selectedPokemons.length < 6) {
            setSelectedPokemons([...selectedPokemons, selectedPokemonForTeam]);
            setAllPokemons(allPokemons.filter(p => p.id !== selectedPokemonForTeam.id));
            setSelectedPokemonForTeam(null);
        }
    };

    const removePokemonFromTeam = (pokemon: Pokemon) => {
        const newSelectedPokemons = selectedPokemons.filter(p => p.id !== pokemon.id);
        setSelectedPokemons(newSelectedPokemons);
        setAllPokemons([...allPokemons, pokemon]);
        setUpdate(prev => !prev);
    };

    const handleSaveTeam = async () => {
        try {
            const userId = localStorage.getItem("userId");

            const response = await axios.put('http://localhost:3005/times/' + id, {
                nomeTime: teamName,
                nome1: selectedPokemons[0]?.numero,
                nome2: selectedPokemons[1]?.numero,
                nome3: selectedPokemons[2]?.numero,
                nome4: selectedPokemons[3]?.numero,
                nome5: selectedPokemons[4]?.numero,
                nome6: selectedPokemons[5]?.numero,
            }, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });

            alert('Time Editado com sucesso!');
            
            window.location.href = '/times';
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                window.location.href = '/splash'; // Redireciona para a página inicial
            }
            console.error('Erro ao criar time:', error);
            alert('Erro ao criar time');
        }


    };

    return (
        <div className="h-screen flex">
            <section className="flex items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
                <div className="flex flex-col items-start gap-2">
                    <h2 className="text-2xl font-bold">Pokémons</h2>
                    <div className="flex flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-2 py-1 rounded-md"
                        />
                        <Button color="orange">
                            <Image src={Search} alt="buscar" width={16} />
                        </Button>
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                        {filteredPokemons.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                variant="sm"
                                nome={pokemon.nome}
                                foto={pokemon.foto}
                                tipos={[pokemon.tipo1, pokemon.tipo2]}
                                numero={pokemon.numero}
                                showSelectButton={true}
                                onSelect={() => selectPokemonForTeam(pokemon)}
                                isSelected={selectedPokemonForTeam?.id === pokemon.id}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col self-end items-center px-4 h-full mt-4">
                        <button
                            onClick={addPokemonToTeam}
                            disabled={!selectedPokemonForTeam || selectedPokemons.length >= 6}
                            className={`text-white rounded-full p-2 transition ${!selectedPokemonForTeam || selectedPokemons.length >= 6
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            <ChevronRightIcon size={24} />
                        </button>
                    </div>
                </div>
            </section>

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
                    <div className="grid grid-flow-row grid-cols-3 gap-4">
                        {selectedPokemons.map((pokemon, index) => (
                            <PokemonCardDelete
                                key={pokemon.id}
                                variant="sm"
                                nome={pokemon.nome}
                                foto={pokemon.foto}
                                tipos={[pokemon.tipo1, pokemon.tipo2]}
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
                        disabled={selectedPokemons.length < 6 || !teamName}
                    >
                        Salvar
                    </Button>
                </div>
            </section>
        </div>
    );
}
