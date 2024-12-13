import Image from 'next/image';
import PokemonTipo from './PokemonTipo';
import PokemonType from '@/types/pokemonType';
import clsx from 'clsx';
import Link from 'next/link';

type Variants = 'md' | 'sm';

type PokemonCardProps = {
  nome: string;
  tipos: PokemonType[];
  img: string; // URL da imagem do Pokémon
  variant?: Variants;
  numero: number;
};

export default function PokemonCard({
  nome,
  tipos,
  img,
  variant = 'md',
  numero,
}: PokemonCardProps) {
  const isValidImage = img && img.trim() !== ''; // Verifica se a URL da imagem é válida

  return (
    <Link href={`/pokemons/${numero}`}
      className={clsx(
        'flex flex-col gap-2 rounded-xl overflow-hidden shadow-lg bg-white p-2 pb-4',
        {
          'w-64': variant === 'md',
          'w-40': variant === 'sm',
        }
      )}
      >
      <div
        className={clsx(
          'bg-green-100 flex items-center justify-center rounded-xl',
          {
            'h-40': variant === 'md',
            'h-20': variant === 'sm',
          }
        )}
      >
        {isValidImage ? (
          <Image
            src={img} // Renderiza a imagem somente se for válida
            alt={`Imagem do Pokémon ${nome}`}
            width={variant === 'md' ? 150 : 75}
            height={variant === 'md' ? 150 : 75} // Altura é obrigatória para evitar warnings
          />
        ) : (
          <div
            className={clsx(
              'bg-gray-200 flex items-center justify-center text-gray-500',
              {
                'h-40 w-40': variant === 'md',
                'h-20 w-20': variant === 'sm',
              }
            )}
          >
            Imagem não disponível
          </div>
        )}
      </div>
      <div className="flex-1 bg-white">
        <div className="flex flex-row gap-1">
          {tipos.map((tipo) => (
            <PokemonTipo key={tipo} tipo={tipo} /> // Tipo como chave única
          ))}
        </div>
        <p className="text-lg font-bold">{nome}</p>
      </div>
    </Link>
  );
}