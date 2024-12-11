import Image from 'next/image';
import Ditto_Perfil from '/public/img/ditto_perfil.png';

export default function Perfil() {
	return (
		<div className="h-screen">
			<section className="flex flex-col items-center h-fit w-fit max-w-6xl m-auto p-8 bg-blue-100/75 border-2 border-slate-300 rounded-xl">
				<div className="place-items-center">
					<h1 className="text-3xl font-semibold mt-8">
						Editar perfil
					</h1>
					<Image
						src={Ditto_Perfil}
						alt="Ditto sorrindo na natureza"
						width={360}
						className="rounded-[50%] mt-8 border-[4px] border-orange-400 hover:opacity-75 transition duration-200"
					/>
					<div className="flex flex-col">
						<label htmlFor="nome" className="ml-1 mt-4 font-medium">
							Nome
						</label>
						<input
							type="text"
							name="nome"
							id="nome"
							placeholder="Nome do usuário"
							className="border-2 h-12 rounded-xl p-1.5 w-80 mb-4"
						/>
					</div>
					<div className="flex">
						<button
							className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg mb-4 mt-6 mr-4
                            text-white text-lg font-bold hover:bg-red-700 transition duration-200"
						>
							Cancelar
						</button>
						<button
							className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg mb-4 mt-6 ml-4
                            text-white text-lg font-bold hover:bg-green-700 transition duration-200"
						>
							Salvar
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
