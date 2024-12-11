import PokemonCard from '@/components/PokemonCard';
import Image from 'next/image';

import SearchIcon from '/public/img/search.svg';

export default function Pokemons() {
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
					<button className="bg-blue-400 hover:bg-blue-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold">
						Filtros
					</button>
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
