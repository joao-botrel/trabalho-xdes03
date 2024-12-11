import Image from 'next/image';
import bulbasauro from '/public/img/bulbasaur.png';
import PokemonTipo from './PokemonTipo';

export default function PokemonCardSmall() {
	return (
		<div className="flex flex-col gap-2 w-40 rounded-xl overflow-hidden shadow-lg bg-white p-2 pb-4">
			<div className="h-20 bg-green-100 flex items-center justify-center rounded-xl">
				<Image src={bulbasauro} alt="Bulbasauro" width={75} />
			</div>
			<div className="flex-1 bg-white">
				<PokemonTipo />
				<p className="text-md font-bold">Bulbasaur</p>
			</div>
		</div>
	);
}
