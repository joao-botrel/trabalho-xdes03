import Image from 'next/image';
import bulbasauro from '/public/img/bulbasaur.png';
import PokemonTipo from './PokemonTipo';
import PokemonType from '@/types/pokemonType';
import clsx from 'clsx';
import Link from 'next/link';
import { PlusIcon, CheckIcon, MinusIcon } from 'lucide-react';

type Variants = 'md' | 'sm';

type PokemonCardProps = {
    nome: string;
    tipos: PokemonType[];
    foto: string;
    numero: number;
    variant?: Variants;
    onSelect?: () => void;
    isSelected?: boolean;
    showSelectButton?: boolean;
};

export default function PokemonCardDelete({
    nome,
    tipos = [], // Valor padrão para evitar erros de acesso
    foto,
    numero,
    variant = 'md',
    onSelect,
    isSelected = false,
    showSelectButton = false,
}: PokemonCardProps) {
    if(foto == ""){

    }
    const isValidImage = foto && foto.trim() !== ''; // Verifica se a URL da imagem é válida
    return (
        <div
            className={clsx(
                'flex flex-col gap-2 rounded-xl overflow-hidden shadow-lg bg-white hover:bg-orange-50 transition duration-200 p-2 pb-4 relative',
                {
                    'w-64': variant === 'md',
                    'w-40': variant === 'sm',
                }
            )}
        >
            {showSelectButton && !isSelected && (
                <button
                    onClick={onSelect}
                    className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-1 hover:bg-green-600 transition"
                >
                    <MinusIcon size={16} />
                </button>
            )}

            {isSelected && (
                <div className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-1">
                    <CheckIcon size={16} />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <div
                    className={clsx(
                        'relative bg-green-100 flex items-center justify-center rounded-xl',
                        {
                            'h-40': variant === 'md',
                            'h-20': variant === 'sm',
                        }
                    )}
                >
                    <p className="absolute bottom-0 left-0 text-sm font-semibold p-2">
                        Nº {numero}
                    </p>{isValidImage ? (
                        <Image
                            src={foto}
                            alt={`Imagem do Pokémon ${nome}`}
                            width={variant === 'md' ? 150 : 75}
                            height={variant === 'md' ? 150 : 75}
                        />
                    ) : (
                        <div className="bg-gray-200 flex items-center justify-center text-gray-500">
                            Imagem não disponível
                        </div>
                    )}

                </div>
                <div className="flex-1">
                    <div className="flex flex-row gap-1">
                        {/* Verifica se `tipos` é um array antes de mapear */}
                        {Array.isArray(tipos) &&
                            tipos.map((tipo, index) => (
                                <PokemonTipo key={index} tipo={tipo} />
                            ))}
                    </div>
                    <p className="text-lg font-bold">{nome}</p>
                </div>
            </div>
        </div>
    );
}
