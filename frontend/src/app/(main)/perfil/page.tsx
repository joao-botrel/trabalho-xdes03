'use client'; 

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Ditto_Perfil from '/public/img/ditto_perfil.png';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(Ditto_Perfil); // Imagem inicial
  const [loading, setLoading] = useState(false);

  const handleNomeChange = (e: any) => {
    setNome(e.target.value);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('fotoPerfil', file); // Adiciona o arquivo de imagem ao FormData

      setLoading(true);

      axios
        .put('http://localhost:3005/usuarios/2', formData)
        .then((response) => {
          setImagem(response.data.url); // Supondo que o servidor retorne a URL da imagem
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao fazer upload:', error);
          setLoading(false);
        });
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('nome', nome);

    // Envie a URL da imagem para o servidor, não o StaticImageData
    if (typeof imagem === 'string') {
      formData.append('fotoPerfil', imagem); // Envia a URL da imagem
    }

    const usuarioId = 2; // Substitua por um valor real de usuário

    try {
      const response = await axios.put('http://localhost:3005/usuarios/2', formData);
      if (response.status === 200) {
        alert('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      alert('Erro ao atualizar perfil.');
      console.error('Erro ao salvar perfil:', error);
    }

  };

  return (
    <div className="h-screen">
      <section className="flex flex-col items-center h-fit w-fit max-w-6xl m-auto p-8 bg-blue-100/75 border-2 border-slate-300 rounded-xl">
        <div className="place-items-center">
          <h1 className="text-3xl font-semibold mt-8">Editar perfil</h1>

          <label htmlFor="imageUpload" className="cursor-pointer">
            <Image
              src={imagem}
              alt="Imagem de perfil"
              width={360}
              height={360}
              className="rounded-[50%] mt-8 border-[4px] border-orange-400 hover:opacity-75 transition duration-200"
            />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
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
              value={nome}
              onChange={handleNomeChange}
              className="border-2 h-12 rounded-xl p-1.5 w-80 mb-4"
            />
          </div>

          <div className="flex">
            <button
              className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg mb-4 mt-6 mr-4 text-white text-lg font-bold hover:bg-red-700 transition duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg mb-4 mt-6 ml-4 text-white text-lg font-bold hover:bg-green-700 transition duration-200"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
