import { ReactElement } from 'react';
import { Nav } from './navbar';
import Logo from '@/assets/logo.svg';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactElement }) {
	return (
		<>
			<Nav>
				<Link href='/'>
					<img src={Logo.src} />
				</Link>
			</Nav>
			<main>{children}</main>
		</>
	);
}
