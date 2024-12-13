'use client';

import Image from 'next/image';
import Pikachu_Feliz from '/public/img/pikachuFeliz.png';
import { useState } from 'react';

import registrar from '@/server/registrar';

export default function Registrar() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');

	const handleRegistrar = async () => {
		const response = registrar.criarUsuario({
			nome,
			email,
			senha,
		});
		console.log(response);
	};

	return (
		<div className="flex gap-12 mx-24 mt-12 justify-center">
			<Image src={Pikachu_Feliz} alt="Pikachu saltando" width={512} />

			<div className="flex flex-col border-2 rounded-xl place-items-center w-fit px-16 justify-evenly bg-white">
				<h1 className="text-3xl font-bold mt-8">Registro</h1>

				<div className="flex flex-col">
					<label htmlFor="nome" className="ml-1 font-medium">
						Nome
					</label>
					<input
						type="text"
						name="nome"
						id="nome"
						placeholder="Digite seu nome de usuário"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
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
						placeholder="Digite seu e-mail"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						placeholder="Digite sua senha"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
						value={senha}
						onChange={(e) => setSenha(e.target.value)}
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
						placeholder="Digite sua senha novamente"
						className="border-2 h-12 rounded-xl p-1.5 w-80"
						value={confirmarSenha}
						onChange={(e) => setConfirmarSenha(e.target.value)}
					/>
				</div>

				<button
					onClick={handleRegistrar}
					className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg mb-4 mt-6
	        text-white text-lg font-bold hover:bg-orange-700 transition duration-200"
				>
					Registrar
				</button>
			</div>
		</div>
	);
}
