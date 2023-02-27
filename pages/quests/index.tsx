import Head from 'next/head';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useQuery, QueryKey, QueryClient, dehydrate } from '@tanstack/react-query';
import QuestSearchResult from '@/components/QuestSearchResult';
import { FlexBox } from '@/components/Flex';
import { CenterBox } from '@/components/CenterBox';

const fetchQuests = async () => {
	const quests = await fetch(`/api/quests`);
	console.log(quests);
	return quests.status == 200 ? quests.json() : null;
};

export default function Quest() {
	const router = useRouter();
	const { isSuccess, data, isLoading, isError } = useQuery(['getQuests'], () => fetchQuests(), {
		enabled: true
	});
	console.log('data:', data);
	const questsBody = () => {
		if (isSuccess) {
			return (
				<CenterBox>
					<QuestSearchResult quests={data} />
				</CenterBox>
			);
		}

		if (isLoading) {
			return <div className='center'>Loading...</div>;
		}

		if (isError) {
			return (
				<div className='center'>
					We couldn't find your pokemon{' '}
					<span role='img' aria-label='sad'>
						?
					</span>
				</div>
			);
		}
	};
	return (
		<>
			<Head>
				<title>Node Guardians</title>
				<meta name='description' content='Node Guardians frontend' />
			</Head>

			<main>{questsBody()}</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['getQuests'], () => fetchQuests());

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
