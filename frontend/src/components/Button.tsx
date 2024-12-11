import { ReactNode } from 'react';

import clsx from 'clsx';

type Variants = 'primary' | 'secondary';
type Colors = 'blue' | 'orange' | 'green';

type ButtonProps = {
	children: ReactNode;
	variant?: Variants;
	color: Colors;
};

export default function Button({
	children,
	variant = 'primary',
	color,
}: ButtonProps) {
	return (
		<button
			className={clsx(
				'transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold',
				{
					'bg-green-400 hover:bg-green-600':
						variant === 'primary' && color === 'green',
					'bg-orange-400 hover:bg-orange-600':
						variant === 'primary' && color === 'orange',
					'bg-blue-400 hover:bg-blue-600':
						variant === 'primary' && color === 'blue',
					'bg-transparent border border-green-400 hover:bg-green-200':
						variant === 'secondary' && color === 'green',
					'bg-transparent border border-orange-400 hover:bg-orange-200':
						variant === 'secondary' && color === 'orange',
					'bg-transparent border border-blue-400 hover:bg-blue-200':
						variant === 'secondary' && color === 'blue',
				}
			)}
		>
			{children}
		</button>
	);
}
