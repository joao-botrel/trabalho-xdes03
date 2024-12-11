import PokemonType from '@/types/pokemonType';

import clsx from 'clsx';

type Variants = 'md' | 'lg';

type PokemonTipoProps = {
	tipo: PokemonType;
	variant?: Variants;
};

export default function PokemonTipo({
	tipo,
	variant = 'md',
}: PokemonTipoProps) {
	let style = clsx('w-fit px-1 border font-semibold text-sm', {
		'w-fit px-1 text-sm rounded-md': variant === 'md',
		'w-fit px-4 py-1 text-xl rounded-xl': variant === 'lg',
	});

	const cases = {
		normal: (
			<p className={`${style} bg-gray-400  border-gray-700`}>Normal</p>
		),
		fighting: (
			<p className={`${style} bg-orange-400  border-orange-700`}>
				Lutador
			</p>
		),
		flying: (
			<p className={`${style} bg-blue-400  border-blue-700`}>Voador</p>
		),
		poison: (
			<p className={`${style} bg-purple-400 border-purple-700`}>Veneno</p>
		),
		ground: (
			<p className={`${style} bg-amber-700 border-amber-900 text-white`}>
				Terrestre
			</p>
		),
		rock: (
			<p className={`${style} bg-gray-700 border-gray-900 text-white`}>
				Pedra
			</p>
		),
		bug: (
			<p className={`${style} bg-green-700 border-green-900 text-white`}>
				Inseto
			</p>
		),
		ghost: (
			<p
				className={`${style} bg-purple-700 border-purple-900 text-white`}
			>
				Fantasma
			</p>
		),
		steel: (
			<p className={`${style} bg-blue-700 border-blue-900 text-white`}>
				Aço
			</p>
		),
		grass: (
			<p className={`${style} bg-green-400  border-green-700`}>Planta</p>
		),
		fire: <p className={`${style} bg-red-400 border-red-700`}>Fogo</p>,
		water: <p className={`${style} bg-blue-400 border-blue-700`}>Água</p>,
		electric: (
			<p className={`${style} bg-yellow-400 border-yellow-700`}>
				Elétrico
			</p>
		),
		psychic: (
			<p className={`${style} bg-pink-700 border-pink-900 text-white`}>
				Psíquico
			</p>
		),
		ice: <p className={`${style} bg-blue-200 border-blue-500`}>Gelo</p>,
		dragon: (
			<p className={`${style} bg-blue-700 border-blue-900 text-white`}>
				Dragão
			</p>
		),
		dark: (
			<p className={`${style} bg-gray-600 border-gray-900 text-white`}>
				Sombrio
			</p>
		),
		fairy: <p className={`${style} bg-pink-200 border-pink-500`}>Fada</p>,
	};

	return <div>{cases[tipo]}</div>;
}
