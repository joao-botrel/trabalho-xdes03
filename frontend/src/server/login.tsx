import api  from './api';

type Usuario = {
    email: string;
    senha: string;
};

function loginUsuario({ email, senha }: Usuario) {
	api.post('/usuarios', { email, senha })
		.then((response) => {
			console.log('Usuário logado com sucesso:', response.data);
			// Armazenar o token no localStorage
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', response.data.data.email);
			localStorage.setItem('senha', response.data.data.senha);
		})
		.catch((error) => {
			console.error('Erro ao logar usuário:', error);
		});
}

const logar = { loginUsuario };

export default logar;