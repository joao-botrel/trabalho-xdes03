import Image from 'next/image';
import PokemonCard from './PokemonCard';

import Pencil from '/public/img/pencil.svg';
import Trash from '/public/img/trash.svg';

import clsx from 'clsx';
import PokemonType from '@/types/pokemonType';

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
};

export default function Time({
    variant = 'horizontal',
    teamName = 'Time Sem Nome',
    pokemons = []
}: TimeProps) {
    return (
        <div className="flex flex-col gap-2 items-start border bg-slate-100/75 border-slate-400 overflow-hidden rounded-lg p-4">
            <div className="flex flex-row justify-between w-full">
                <h3 className="text-lg font-semibold">{teamName}</h3>
                <div className="flex flex-row gap-4">
                    <Image src={Pencil} alt="editar" height={24} />
                    <Image src={Trash} alt="excluir" height={24} />
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
