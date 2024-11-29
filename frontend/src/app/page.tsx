import Image from 'next/image';
import flareon from '/public/img/flareon.png';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex justify-center h-screen items-center bg-splash-screen bg-cover">
			<div className="flex flex-row gap-12">
				<div className="flex items-center justify-center">
					<Image src={flareon} alt="Imagem do Flareon" width={512} />
				</div>
				<div className="flex flex-col justify-center items-center gap-20">
					<div className="flex flex-col gap-2">
						<h1 className="text-5xl font-bold">Poke-Des</h1>
						<p className="text-lg">
							O melhor lugar para encontrar seus pokemons
							favoritos!
						</p>
					</div>
					<div className="flex gap-3">
						<Link
							className="bg-orange-500 hover:bg-orange-700 transition duration-200 rounded-lg p-2 w-24 text-white font-bold text-center"
							href={'/login'}
						>
							Login
						</Link>
						<Link
							className="bg-transparent border border-orange-500 hover:bg-orange-200 hover:border-orange-400 text-orange-700 transition duration-200 rounded-lg p-2 w-24 font-bold text-center"
							href={'/registrar'}
						>
							Registrar
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
