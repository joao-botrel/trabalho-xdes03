import Button from '@/components/Button';
import PokemonCard from '@/components/PokemonCard';

import Search from '/public/img/search.svg';

import Image from 'next/image';

export default function NovoTime() {
	return (
		<div className="h-screen flex">
			<section className="flex items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
				<div className="flex flex-col items-start gap-2">
					<h2 className="text-2xl font-bold">Pokemons</h2>
					<div className="flex flex-row gap-2">
						<input
							type="text"
							placeholder="Pesquisar"
							className="px-2 py-1 rounded-md"
						/>
						<Button color="orange">
							<Image src={Search} alt="buscar" width={16} />
						</Button>
					</div>
					<div className="grid grid-flow-row grid-cols-2 gap-4 overscroll-contain">
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
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
						placeholder="Nome"
						className="p-2 bg-white/75 rounded-lg w-64"
					/>
					<div className="grid grid-flow-col grid-rows-2 gap-4">
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
						<PokemonCard
							variant="sm"
							nome="Bulbasaur"
							img=""
							tipos={['grass', 'poison']}
						/>
					</div>
				</div>
				<div className="flex flex-col items-end w-full">
					<Button color="blue">Salvar</Button>
				</div>
			</section>
		</div>
	);
}
