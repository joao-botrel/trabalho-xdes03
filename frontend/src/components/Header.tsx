'use client';

import Image from 'next/image';
import Icon from '/public/img/pokebola.png';
import Link from 'next/link';
import Foto from '/public/img/profile-photo.jpg';

import { useState } from 'react';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleDropdown = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="h-20 bg-orange-500 flex items-center px-16 justify-between">
			<Link href={'/inicio'}>
				<Image src={Icon} alt="Icon do site" height={64} />
			</Link>
			<div className="flex flex-row items-center gap-8 font-bold text-white text-lg">
				<Link href={'/inicio'}>Início</Link>
				<Link href={'/'}>Pokémons</Link>
				<Link href={'/'}>Times</Link>
				<div className="relative">
					<button onClick={toggleDropdown}>
						<Image
							src={Foto}
							alt="Foto de perfil"
							height={48}
							className="rounded-full"
						/>
					</button>
					{/* Menu Dropdown */}
					{isMenuOpen && (
						<div className="absolute right-0 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Link
									href="/perfil"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Editar Perfil
								</Link>
								<Link
									href="/splash"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Sair
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
