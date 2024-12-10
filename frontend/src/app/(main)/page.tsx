import Image from 'next/image';
import Link from 'next/link';

import bulbasaur from '/public/img/bulbasaur.png';

import PokemonCard from '@/components/PokemonCard';
import Time from '@/components/Time';

export default function Inicio() {
	return (
		<div className=" flex flex-row h-fit w-5/6 max-w-6xl m-auto gap-20 p-8">
			<section className="flex flex-col h-fit bg-green-100/75 border-2 border-slate-300 rounded-xl p-8 items-center">
				<div className="flex flex-col gap-4 items-start">
					<h2 className="text-xl font-bold">Lista de Pokemons</h2>
					<div className="flex flex-col gap-2 items-end">
						<div className="flex flex-col gap-4">
							<PokemonCard />
							<PokemonCard />
							<PokemonCard />
						</div>
						<Link
							className="bg-green-400 hover:bg-green-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
							href={'/pokemons'}
						>
							Ver Todos {'>>'}
						</Link>
					</div>
				</div>
			</section>
			<div className="flex flex-col grow justify-between">
				<section className="flex flex-col bg-blue-100/75 border-2 border-slate-300 rounded-xl p-8 items-center">
					<div className="flex flex-row w-full justify-between">
						<div className="flex flex-col h-full justify-between gap-6">
							<div>
								<h2 className="text-xl font-bold">Meu Nome</h2>
								<div className="flex flex-col gap-2">
									<h3 className="text-lg font-semibold">
										Pokemons Favoritos
									</h3>
									<div className="grid grid-rows-2 grid-flow-col gap-x-2 gap-y-1">
										<Image
											src={bulbasaur}
											alt={''}
											width={75}
										/>
										<Image
											src={bulbasaur}
											alt={''}
											width={75}
										/>
										<Image
											src={bulbasaur}
											alt={''}
											width={75}
										/>
										<Image
											src={bulbasaur}
											alt={''}
											width={75}
										/>
										<Image
											src={bulbasaur}
											alt={''}
											width={75}
										/>
										<Image
											src={bulbasaur}
											alt={''}
											width={75}
										/>
									</div>
								</div>
							</div>
							<div className="flex gap-2">
								<Link
									className="bg-blue-400 hover:bg-blue-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
									href={'/times'}
								>
									Times
								</Link>
								<Link
									className="bg-transparent border border-blue-400 hover:bg-blue-200 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
									href={'/perfil'}
								>
									Editar Perfil
								</Link>
							</div>
						</div>
						<div className="bg-amber-300 w-64 h-64 rounded-full"></div>
					</div>
				</section>
				<section className="flex flex-col items-center bg-orange-100/75 border-2 border-slate-300 rounded-xl p-6">
					<div className="flex flex-col gap-4 items-start">
						<h2 className="text-xl font-bold">Meus Times</h2>
						<div className="flex flex-col gap-2 items-end">
							<Time variant="grid" />
							<Link
								className="bg-orange-400 hover:bg-orange-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
								href={'/times'}
							>
								Ver Todos {'>>'}
							</Link>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
