import Image from 'next/image';
import Icon from '/public/img/pokebola.png';
import Link from 'next/link';
import Foto from '/public/img/profile-photo.jpg';

export default function Header() {
	return (
		<header className="h-20 bg-orange-500 flex items-center px-16 justify-between">
			<Link href={'/inicio'}>
				<Image src={Icon} alt="Icon do site" height={64} />
			</Link>
			<div className="flex flex-row items-center gap-8 font-bold text-white text-lg">
				<Link href={'/inicio'}>Início</Link>
				<Link href={'/'}>Pokémons</Link>
				<Link href={'/'}>Times</Link>
				<Image
					src={Foto}
					alt="Foto de perfil"
					height={48}
					className="rounded-full"
				/>
			</div>
		</header>
	);
}
