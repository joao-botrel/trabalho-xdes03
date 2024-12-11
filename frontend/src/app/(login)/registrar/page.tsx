import Image from 'next/image';
import Pikachu_Feliz from '/public/img/pikachuFeliz.png';

export default function Registrar() {
	return (
		<div className="flex gap-12 mx-24 mt-12 justify-center">
			<Image src={Pikachu_Feliz} alt="Pikachu saltando" width={512} />

			<form className="flex flex-col border-2 rounded-xl place-items-center w-fit px-16 justify-evenly bg-white">
				<h1 className="text-3xl font-bold mt-8">Registro</h1>

				<div className="flex flex-col">
					<label htmlFor="nome" className="ml-1 font-medium">
						Nome
					</label>
					<input
						type="text"
						name="nome"
						id="nome"
						placeholder="Nome completo"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
					/>
				</div>

				<div className="flex flex-col pt-4">
					<label htmlFor="email" className="ml-1 font-medium">
						E-mail
					</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="E-mail"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
					/>
				</div>

				<div className="flex flex-col pt-4">
					<label htmlFor="senha" className="ml-1 font-medium">
						Senha
					</label>
					<input
						type="password"
						name="senha"
						id="senha"
						placeholder="Senha"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
					/>
				</div>

				<div className="flex flex-col pt-4">
					<label htmlFor="senhaConf" className="ml-1 font-medium">
						Confirme sua senha
					</label>
					<input
						type="password"
						name="senhaConf"
						id="senhaConf"
						placeholder="Digite sua senha"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
					/>
				</div>

				<button
					className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg mb-4 mt-6
	        text-white text-lg font-bold hover:bg-orange-700 transition duration-200"
				>
					Registrar
				</button>
			</form>
		</div>
	);
}
