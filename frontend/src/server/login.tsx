import api  from './api';

type Usuario = {
    email: string;
    senha: string;
};

function loginUsuario({ email, senha }: Usuario) {
	api.post('/usuarios/login', { email, senha })
		.then((response) => {
			console.log('Usuário logado com sucesso:', response.data);
			// Armazenar o token no localStorage
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('userId', response.data.data.perfilId);
			localStorage.setItem('senha', response.data.data.senha);
			// Redirecionar para a página desejada
			window.location.href = '/';
		})
		.catch((error) => {
			console.error('Erro ao logar usuário:', error);
		});
}

const logar = { loginUsuario };

export default logar;