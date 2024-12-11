'use client';

import PokemonCard from '@/components/PokemonCard';
import Image from 'next/image';

import SearchIcon from '/public/img/search.svg';
import { useState } from 'react';
import PokemonTipo from '@/components/PokemonTipo';

enum MODAL_FILTRO {
	NONE = 0,
	LIST = 1,
	GEN = 2,
	TYPE = 3,
}

export default function Pokemons() {
	const [showFilters, setShowFilters] = useState(MODAL_FILTRO.NONE);

	const toggleDropdown = () => {
		showFilters === MODAL_FILTRO.NONE
			? setShowFilters(MODAL_FILTRO.LIST)
			: setShowFilters(MODAL_FILTRO.NONE);
	};

	return (
		<div className="flex flex-col items-center h-fit w-5/6 max-w-6xl m-auto gap-20 p-8 bg-gray-100/75 border-2 border-slate-300 rounded-xl">
			<div className="flex flex-row justify-between w-full">
				<h1 className="text-3xl font-bold">Pokemons</h1>
				<div className="flex flex-row gap-4 items-center">
					<div className="flex flex-row items-center gap-2">
						<input
							className="p-2 rounded-md border border-gray-500"
							type="text"
							placeholder="Buscar"
						/>
						<button className="bg-orange-400 hover:bg-orange-600 transition duration-300 p-2 rounded-md">
							<Image
								src={SearchIcon}
								alt={'Buscar'}
								height={24}
							/>
						</button>
					</div>
					<div className="relative">
						<button
							onClick={toggleDropdown}
							className="bg-blue-400 hover:bg-blue-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
						>
							Filtros
						</button>
						{showFilters === MODAL_FILTRO.LIST && (
							<div className="absolute right-0 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
								<div className="py-1">
									<button
										onClick={() =>
											setShowFilters(MODAL_FILTRO.GEN)
										}
										className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										Geração
									</button>
									<button
										onClick={() =>
											setShowFilters(MODAL_FILTRO.TYPE)
										}
										className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										Tipo
									</button>
								</div>
							</div>
						)}
						{showFilters === MODAL_FILTRO.GEN && (
							<div className="absolute right-0 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
								<div className="py-1">
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração I
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração II
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração III
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração IV
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração V
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração VI
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração VII
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração VIII
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Geração IX
									</button>
								</div>
							</div>
						)}
						{showFilters === MODAL_FILTRO.TYPE && (
							<div className="absolute right-0 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
								<div className="py-1">
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										<PokemonTipo tipo="fire" />
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										<PokemonTipo tipo="water" />
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										<PokemonTipo tipo="grass" />
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										<PokemonTipo tipo="ghost" />
									</button>
									<button className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										<PokemonTipo tipo="ground" />
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="grid grid-flow-row grid-cols-3  gap-y-8 gap-x-16 w-fit">
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
				<PokemonCard
					nome="Bulbasaur"
					img=""
					tipos={['grass', 'poison']}
					numero={1}
				/>
			</div>
		</div>
	);
}
