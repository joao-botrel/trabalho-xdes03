import Image from 'next/image';
import PokemonCardSmall from './PokemonCardSmall';

import Pencil from '/public/img/pencil.svg';
import Trash from '/public/img/trash.svg';

export default function Time() {
	return (
		<div className="flex flex-col gap-2 items-start border bg-slate-100/75 border-slate-400 overflow-hidden rounded-lg p-4">
			<div className="flex flex-row justify-between w-full">
				<h3 className="text-lg font-semibold">Time Pokemaníaco</h3>
				<div className="flex flex-row gap-4">
					<Image src={Pencil} alt="editar" height={24} />
					<Image src={Trash} alt="excluir" height={24} />
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<PokemonCardSmall />
				<PokemonCardSmall />
				<PokemonCardSmall />
				<PokemonCardSmall />
				<PokemonCardSmall />
				<PokemonCardSmall />
			</div>
		</div>
	);
}
