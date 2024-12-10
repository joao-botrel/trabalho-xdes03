import Image from 'next/image';
import PokemonCard from './PokemonCard';

import Pencil from '/public/img/pencil.svg';
import Trash from '/public/img/trash.svg';

import clsx from 'clsx';

type Variant = 'horizontal' | 'grid';

type TimeProps = {
	variant: Variant;
};

export default function Time({ variant }: TimeProps) {
	return (
		<div className="flex flex-col gap-2 items-start border bg-slate-100/75 border-slate-400 overflow-hidden rounded-lg p-4">
			<div className="flex flex-row justify-between w-full">
				<h3 className="text-lg font-semibold">Time Pokemaníaco</h3>
				<div className="flex flex-row gap-4">
					<Image src={Pencil} alt="editar" height={24} />
					<Image src={Trash} alt="excluir" height={24} />
				</div>
			</div>
			<div
				className={clsx('gap-4', {
					'flex flex-row': variant === 'horizontal',
					'grid grid-rows-2 grid-flow-col': variant === 'grid',
				})}
			>
				<PokemonCard variant="sm" />
				<PokemonCard variant="sm" />
				<PokemonCard variant="sm" />
				<PokemonCard variant="sm" />
				<PokemonCard variant="sm" />
				<PokemonCard variant="sm" />
			</div>
		</div>
	);
}
