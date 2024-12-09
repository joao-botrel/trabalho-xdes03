import Button from '@/components/Button';
import PokemonCardSmall from '@/components/PokemonCardSmall';

export default function NovoTime() {
	return (
		<div className="h-screen flex flex-row">
			<section className="flex items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
				<div className="flex flex-col items-start gap-2">
					<h2 className="text-2xl font-bold">Pokemons</h2>
					<div className="flex flex-col gap-4">
						<PokemonCardSmall />
						<PokemonCardSmall />
						<PokemonCardSmall />
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
				<div className="flex flex-col items-start">
					<h2 className="text-2xl font-bold">Time</h2>
					<input
						type="text"
						id="team-name"
						name="team-name"
						placeholder="Nome"
					/>
					<div className="grid grid-flow-col grid-rows-2">
						<PokemonCardSmall />
						<PokemonCardSmall />
						<PokemonCardSmall />
						<PokemonCardSmall />
						<PokemonCardSmall />
						<PokemonCardSmall />
					</div>
				</div>
				<div className="flex flex-col items-end w-full">
					<Button color="blue">Salvar</Button>
				</div>
			</section>
		</div>
	);
}
