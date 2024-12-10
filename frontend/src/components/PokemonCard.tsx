import Image from 'next/image';
import bulbasauro from '/public/img/bulbasaur.png';
import PokemonTipo from './PokemonTipo';

import clsx from 'clsx';

type Variants = 'md' | 'sm';

type PokemonCardProps = {
	variant?: Variants;
};

export default function PokemonCard({ variant = 'md' }: PokemonCardProps) {
	return (
		<div
			className={clsx(
				'flex flex-col gap-2 rounded-xl overflow-hidden shadow-lg bg-white p-2 pb-4',
				{
					'w-64': variant === 'md',
					'w-40': variant === 'sm',
				}
			)}
		>
			<div
				className={clsx(
					'bg-green-100 flex items-center justify-center rounded-xl',
					{
						'h-40': variant === 'md',
						'h-20': variant === 'sm',
					}
				)}
			>
				<Image
					src={bulbasauro}
					alt="Bulbasauro"
					width={variant === 'md' ? 150 : 75}
				/>
			</div>
			<div className="flex-1 bg-white">
				<PokemonTipo />
				<p className="text-lg font-bold">Bulbasaur</p>
			</div>
		</div>
	);
}
