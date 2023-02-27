import Link from 'next/link';
import Head from 'next/head';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useQuery, QueryKey, QueryClient, dehydrate } from '@tanstack/react-query';
import RoundCard from '@/components/RoundBox';
import RoundImg from '@/components/RoundImg';
import Title from '@/components/Title';
import { FlexBox, FlexInner } from '@/components/Flex';
import { t } from '@/constants/lang';

import KnifeIcon_Active from '@/assets/knife_active.svg';
import KnifeIcon from '@/assets/knife.svg';
import DecorationLeft from '@/assets/decoration_left.svg';
import DecorationRight from '@/assets/decoration_right.svg';
import EXP from '@/assets/exp.svg';
import { CenterBox } from '@/components/CenterBox';
import styled from 'styled-components';
import { Button } from '@/components/Button';

const fetchQuest = async (questID: string) => {
	const quests = await fetch(`/api/quests/${questID}`);
	return quests.json();
};

const DecorationDiv = styled.div`
	background-image: url(${DecorationLeft.src}), url(${DecorationRight.src});
	background-repeat: no-repeat;
	background-position: center left, center right;
	width: 65%;
	margin: auto;
`;

const FlexBoxBottom = styled(FlexBox)`
	justify-content: space-between;
`;

const FillDiv = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
`;

export default function Quest() {
	const router = useRouter();
	const questID = typeof router.query?.id === 'string' ? router.query.id : '';
	console.log(questID);
	const {
		isSuccess,
		data: quest,
		isLoading,
		isError
	} = useQuery([`getQuests/${questID}`], () => fetch(`/api/quests/${questID}`).then((res) => res.json()), {
		enabled: true
	});
	console.log('data:id', quest);

	const goBack = () => {
		router.back();
	};
	const questsBody = () => {
		if (isSuccess) {
			return (
				<CenterBox className='scrollbar'>
					<RoundCard className='p-4'>
						<RoundImg src={quest.cover} width={748} height={270} />
						<div className='center'>
							<DecorationDiv>
								<Title fontSize={20} fontFamily='Cinzel' py={12}>
									{quest.title}
								</Title>
							</DecorationDiv>
						</div>
						<FlexBox style={{ padding: '0 1rem 1rem', height: '365px', flexDirection: 'column' }}>
							<FlexBox>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={10}>
											<Title color='gold' fontFamily='Lato' fontSize={14} py={4}>
												{t('skilltree')}
											</Title>
										</FlexInner>
										<FlexInner>
											<Title color='blue' fontSize={14} py={4}>
												{quest.skillTree}
											</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={10}>
											<Title color='gold' fontSize={14} py={4}>
												{t('difficulty')}
											</Title>
										</FlexInner>
										<FlexInner>
											{Array.from({ length: 5 }, (_, i) => i).map((i, index) => {
												if (index >= quest.difficulty) {
													return <img src={KnifeIcon_Active.src} key={quest.id + i + KnifeIcon_Active.src} />;
												} else {
													return <img src={KnifeIcon.src} key={quest.id + i + KnifeIcon_Active.src} />;
												}
											})}
										</FlexInner>
									</FlexBox>
								</FlexInner>
							</FlexBox>
							<FlexBox>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={10}>
											<Title color='gold' fontSize={14} py={4}>
												{t('skill')}
											</Title>
										</FlexInner>
										<FlexInner>
											<Title color='white' fontSize={14} py={4}>
												{quest.skill}
											</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={10}>
											<Title color='gold' fontSize={14} py={4}>
												{t('quest-type')}
											</Title>
										</FlexInner>
										<FlexInner>
											<Title color='white' fontSize={14} py={4}>
												{quest.type}
											</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
							</FlexBox>
							<Title className='text-overflow' color='grey' fontSize={14} py={4}>
								{quest.description}
							</Title>
							<FillDiv />
							<FlexBoxBottom style={{ justifyContent: 'space-between' }}>
								<FlexInner style={{ alignSelf: 'flex-end' }}>
									<Title fontSize={14} fontFamily='Cinzel' py={12}>
										{t('quest-rewards')}
									</Title>
									<img src={EXP.src} />
								</FlexInner>
								<FlexInner style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
									<Button onClick={goBack}>Go Back</Button>
								</FlexInner>
							</FlexBoxBottom>
						</FlexBox>
					</RoundCard>
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
	const id = context.params?.id as string;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery([`getQuests/${id}`], () => fetchQuest(id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking'
	};
};
