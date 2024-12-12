import api from './api';

type Usuario = {
	nome: string;
	email: string;
	senha: string;
	confirmarSenha: string;
};

function criarUsuario({ nome, email, senha, confirmarSenha }: Usuario) {
	const newUser = {
		email: 'novouser@email.com',
		senha: 'senha123',
		role: false,
		nome: 'Novo Usuário',
		bio: 'Uma breve biografia',
	};

	api.post('/usuarios', newUser)
		.then((response) => {
			console.log('Usuário criado com sucesso:', response.data);
			// Armazenar o token no localStorage
			localStorage.setItem('token', response.data.token);
		})
		.catch((error) => {
			console.error('Erro ao criar usuário:', error);
		});
}

const registrar = { criarUsuario };

export default registrar;
