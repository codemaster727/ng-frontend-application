import Head from 'next/head';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { useQuery, QueryKey, QueryClient, dehydrate } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const fetchQuests = async () => {
	const quests = await fetch('/api/quests');
	return quests;
};

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push('quests');
	});
	return (
		<>
			<Head>
				<title>Node Guardians</title>
				<meta name='description' content='Node Guardians frontend' />
			</Head>

			<main></main>
		</>
	);
}
