import api from './api';

type Usuario = {
	nome: string;
	email: string;
	senha: string;
};

function criarUsuario({ nome, email, senha }: Usuario) {
	api.post('/usuarios', { nome, email, senha, role: false })
		.then((response) => {
			console.log('Usuário criado com sucesso:', response.data);
			// Armazenar o token no localStorage
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', response.data.data.email);
			localStorage.setItem('senha', response.data.data.senha);
		})
		.catch((error) => {
			console.error('Erro ao criar usuário:', error);
		});
}

const registrar = { criarUsuario };

export default registrar;
