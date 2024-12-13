import Image from 'next/image';
import PokemonCard from './PokemonCard';

import Pencil from '/public/img/pencil.svg';
import Trash from '/public/img/trash.svg';

import clsx from 'clsx';
import PokemonType from '@/types/pokemonType';
import Link from 'next/link';
import api from '@/server/api';
import axios from 'axios';
import router from 'next/router';

type Variant = 'horizontal' | 'grid';

type Pokemon = {
    id: number;
    nome: string;
    tipo1: PokemonType;
    tipo2: PokemonType;
    foto: string;
    numero: number;
};

type TimeProps = {
    variant?: Variant;
    teamName?: string;
    pokemons?: Pokemon[];
    id?: number;
    onDelete: (id: number) => void;
};

const handleDelete = async (id: number, setUpdate: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        await api.delete(`http://localhost:3005/times/${id}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
        setUpdate(prev => !prev);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            window.location.href = '/splash'; // Redireciona para a página inicial
        }
        console.error('Erro ao deletar time:', error);
    }
};

export default function Time({
    variant = 'horizontal',
    teamName = 'Time Sem Nome',
    pokemons = [],
    id = 0,
    onDelete
}: TimeProps) {
    return (
        <div className="flex flex-col gap-2 items-start border bg-slate-100/75 border-slate-400 overflow-hidden rounded-lg p-4">
            <div className="flex flex-row justify-between w-full">
                <h3 className="text-lg font-semibold">{teamName}</h3>
                <div className="flex flex-row gap-4">
                </div>
            </div>
            <div
                className={clsx('gap-4', {
                    'flex flex-row': variant === 'horizontal',
                    'grid grid-rows-2 grid-flow-col': variant === 'grid',
                })}
            >
                {pokemons.map((poke) => (
                    <PokemonCard
                        variant='sm'
                        key={poke.id} // A chave única pode ser o número do Pokémon
                        nome={poke.nome.charAt(0).toUpperCase() + poke.nome.slice(1)} // Capitaliza a primeira letra do nome
                        img={poke.foto} // Foto do Pokémon
                        tipos={[poke.tipo1, poke.tipo2].filter(Boolean)} // Tipos, incluindo tipo2 caso exista
                        numero={poke.numero}
                    />
                ))}

            </div>
        </div>
    );
}
