'use client';
import Image from 'next/image';
import Pikachu from '/public/img/detetivePikachu.png';
import logar from '@/server/login';
import { z } from 'zod';
import { useState } from 'react';

const LoginSchema = z.object({
	email: z.string().email('Formato de email inválido'),
	senha: z.string().trim().min(4, {message: 'Senha deve ter no mínimo 4 caracteres'}),
})

export default function Login() {

	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const handleSubmit = async () => {
		const response =  logar.loginUsuario({ 
			email, 
			senha 
		});

		const validation = LoginSchema.safeParse({ email, senha });

	if(!validation.success) {
		let errorMsg = "";

            validation.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '.\n';
            })

            alert(errorMsg);
            return;
	}
		console.log(response);
	};


	return (
		<div className="flex gap-12 mx-24 mt-12 justify-center">
			<Image
				src={Pikachu}
				alt="Pikachu usando uma lupa e com um chapéu marrom de detetive"
				width={512}
			/>

			<div className="flex flex-col border-2 rounded-xl place-items-center w-fit px-16 justify-center">
				<h1 className="mb-12 text-3xl font-bold mt-4">Login</h1>
				<div className="flex flex-col">
					<label htmlFor="email" className="ml-1 font-medium">
						E-mail
					</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Digite seu e-mail"
						className="border-2 h-12 rounded-xl p-1.5 w-80 mb-12"
						onChange ={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="senha" className="ml-1 font-medium">
						Senha
					</label>
					<input
						type="password"
						name="senha"
						id="senha"
						placeholder="Digite sua senha"
						className="border-2 h-12 rounded-xl p-1.5 w-80 mb-12"
						onChange ={(e) => setSenha(e.target.value)}
					/>
				</div>

				<button onClick={handleSubmit}
					className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg 
            text-white text-lg font-bold hover:bg-orange-700 transition duration-200"
				>
					Login
				</button>

				<p className="mt-4 font-medium">
					Não tem uma conta?{' '}
					<a
						href={'/registrar'}
						className="text-orange-500 font-medium text hover:underline"
					>
						Registre-se!
					</a>
				</p>
			</div>
		</div>
	);
}
