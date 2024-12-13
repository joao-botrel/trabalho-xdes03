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

type Pokemon = {
	id: number;
	nome: string;
	tipo1: PokemonType;
	tipo2: PokemonType;
	foto: string;
	numero: number;
};

export default function NovoTime() {
	const [searchTerm, setSearchTerm] = useState('');
	const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
	const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
	const [teamName, setTeamName] = useState('');
	const [selectedPokemonForTeam, setSelectedPokemonForTeam] = useState<Pokemon | null>(null);

	// Fetch all Pokémon on component mount
	useEffect(() => {
		const fetchAllPokemons = async () => {
			try {
				const response = await axios.get('http://localhost:3005/pokemon');
				setAllPokemons(response.data.data);
				setFilteredPokemons(response.data.data);
			} catch (error) {
				console.error('Erro ao buscar todos os Pokémons:', error);
			}
		};
		fetchAllPokemons();
	}, []);

	// Filter Pokémon based on search term
	useEffect(() => {
		const filtered = allPokemons.filter(pokemon =>
			pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPokemons(filtered);
	}, [searchTerm, allPokemons]);

	// Select Pokémon for team
	const selectPokemonForTeam = (pokemon: Pokemon) => {
		setSelectedPokemonForTeam(pokemon);
	};

	// Add Pokémon to team
	const addPokemonToTeam = () => {
		if (selectedPokemonForTeam && selectedPokemons.length < 6) {
			setSelectedPokemons([...selectedPokemons, selectedPokemonForTeam]);
			setAllPokemons(allPokemons.filter(p => p.id !== selectedPokemonForTeam.id));
			setSelectedPokemonForTeam(null);
		}
	};

	// Remove Pokémon from team
	const removePokemonFromTeam = (pokemon: Pokemon) => {
		const newSelectedPokemons = selectedPokemons.filter(p => p.id !== pokemon.id);
		setSelectedPokemons(newSelectedPokemons);
		setAllPokemons([...allPokemons, pokemon]);
	};

	// Save team
	const handleSaveTeam = async () => {
		try {
			const userId = 1; // Replace with actual user ID retrieval

			const response = await axios.post('http://localhost:3005/times', {
				nomeTime: teamName,
				nome1: selectedPokemons[0]?.numero,
				nome2: selectedPokemons[1]?.numero,
				nome3: selectedPokemons[2]?.numero,
				nome4: selectedPokemons[3]?.numero,
				nome5: selectedPokemons[4]?.numero,
				nome6: selectedPokemons[5]?.numero ,
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
							className={`bg-green-500 text-white rounded-full p-2 transition ${!selectedPokemonForTeam || selectedPokemons.length >= 6
								? 'bg-gray-300 cursor-not-allowed'
								: 'hover:bg-green-600'
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
					<div className="grid grid-flow-col grid-rows-2 gap-4">
						{selectedPokemons.map((pokemon, index) => (
							<PokemonCard
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
						disabled={selectedPokemons.length <6 || !teamName}
					>
						Salvar
					</Button>
				</div>
			</section>
		</div>
	);
}
