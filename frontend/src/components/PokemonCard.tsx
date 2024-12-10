import Image from 'next/image';
import bulbasauro from '/public/img/bulbasaur.png';
import PokemonTipo from './PokemonTipo';

export default function PokemonCard() {
	return (
		<div className="flex flex-col gap-2 w-64 rounded-xl overflow-hidden shadow-lg bg-white p-2 pb-4">
			<div className="h-40 bg-green-100 flex items-center justify-center rounded-xl">
				<Image src={bulbasauro} alt="Bulbasauro" width={150} />
			</div>
			<div className="flex-1 bg-white">
				<PokemonTipo />
				<p className="text-lg font-bold">Bulbasaur</p>
			</div>
		</div>
	);
}
