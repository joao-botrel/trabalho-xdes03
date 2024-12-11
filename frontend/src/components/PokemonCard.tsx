import Image from 'next/image';
import bulbasauro from '/public/img/bulbasaur.png';
import PokemonTipo from './PokemonTipo';

import PokemonType from '@/types/pokemonType';

import clsx from 'clsx';

type Variants = 'md' | 'sm';

type PokemonCardProps = {
	nome: string;
	tipos: PokemonType[];
	img: string;
	numero: number;
	variant?: Variants;
};

export default function PokemonCard({
	nome,
	tipos,
	img,
	numero,
	variant = 'md',
}: PokemonCardProps) {
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
					'relative bg-green-100 flex items-center justify-center rounded-xl',
					{
						'h-40': variant === 'md',
						'h-20': variant === 'sm',
					}
				)}
			>
				<p className="absolute bottom-0 left-0 text-sm font-semibold p-2">
					Nº {numero}
				</p>
				<Image
					src={bulbasauro}
					alt={`Imagem do Pokémon ${nome}`}
					width={variant === 'md' ? 150 : 75}
				/>
			</div>
			<div className="flex-1 bg-white">
				<div className="flex flex-row gap-1">
					{tipos.map((tipo, index) => (
						<PokemonTipo key={index} tipo={tipo} />
					))}
				</div>
				<p className="text-lg font-bold">{nome}</p>
			</div>
		</div>
	);
}
