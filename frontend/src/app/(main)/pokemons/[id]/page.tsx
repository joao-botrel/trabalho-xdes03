'use client';

import Image from 'next/image';

import Charmander from '/public/img/charmander.png';

import PokemonTipo from '@/components/PokemonTipo';
import { useParams } from 'next/navigation';

export default function Pokemon() {
	const { id } = useParams();

	return (
		<div className="h-screen">
			<section className="flex items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
				<div className="flex flex-col place-items-center">
					<div className="flex mt-2">
						<div
							id="imagemPokemon"
							className="w-[70%] place-items-center flex"
						>
							<Image
								src={Charmander}
								alt="Charmander"
								width={420}
							/>
						</div>
						<div
							id="infoPokemon"
							className="flex flex-col ml-8 w-[60%]"
						>
							<p id="numPokemon" className="text-bold text-xl">
								N° {id}
							</p>
							<div className="flex">
								<p
									id="genPokemon"
									className="mt-1 mb-1 text-xl text-white text-center rounded-xl bg-orange-400 border border-orange-700 px-4 py-1"
								>
									Gen 1
								</p>
								<p
									id="catPokemon"
									className="mt-1 mb-1 ml-2 text-xl text-white text-center rounded-xl bg-orange-400 border border-orange-700 px-4 py-1"
								>
									Categoria
								</p>
							</div>
							<h1 className="text-4xl font-semibold mb-1 mt-1">
								Charmander
							</h1>
							<p className="text-xl mt-1 mb-1">Tipo</p>
							{/* <p id="tipoPokemon" className="text-xl text-white text-center rounded-xl bg-red-600 w-1/3 h-8">Fogo</p> */}
							<PokemonTipo tipo="fire" variant="lg" />
							<div className="bg-orange-200 mt-4 text-xl text-semibold h-[50%] pl-4 pt-4 rounded-xl">
								<p id="descricaoPokemon">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Reprehenderit,
									exercitationem magni, voluptatem, a sint
									architecto minima suscipit modi quo officia
									cum! Pariatur delectus iusto quo mollitia
									facilis, porro dolorem quidem!
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
