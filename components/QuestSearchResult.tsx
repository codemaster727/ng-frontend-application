import Link from 'next/link';
import RoundCard from './RoundBox';
import RoundImg from './RoundImg';
import Title from './Title';
import { FlexBox, FlexInner } from './Flex';
import { t } from '@/constants/lang';
import styled from 'styled-components';
import KnifeIcon_Active from '@/assets/knife_active.svg';
import KnifeIcon from '@/assets/knife.svg';

const MarginDiv = styled.div`
	margin: 12px;
`;

const FlexBoxCustom = styled(FlexBox)`
	gap: 24px;
	justify-content: center;
	align-items: center;
	max-height: 80vh;
	overflow: auto;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
`;

const QuestSearchResult = ({ quests }: { quests: any[] }) => {
	return quests && quests.length > 0 ? (
		<FlexBoxCustom className='scrollbar'>
			{quests?.map((quest) => (
				<RoundCard key={quest.id} className='p-4'>
					<Link href={`/quests/${quest.id}`}>
						<RoundImg src={quest.cover} />
						<MarginDiv>
							<Title fontSize={14} fontFamily='Lato'>
								{quest.title}
							</Title>
							<FlexBox>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={35}>
											<Title color='gold' fontFamily='Lato'>
												{t('skilltree')}
											</Title>
										</FlexInner>
										<FlexInner>
											<Title color='blue'>{quest.skillTree}</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={35}>
											<Title color='gold'>{t('difficulty')}</Title>
										</FlexInner>
										<FlexInner>
											{Array.from({ length: 5 }, (_, i) => i).map((i, index) => {
												if (index >= quest.difficulty) {
													return <img src={KnifeIcon_Active.src} key={quest.id + i + KnifeIcon_Active.src} />;
												} else {
													return <img src={KnifeIcon.src} key={quest.id + i + KnifeIcon.src} />;
												}
											})}
										</FlexInner>
									</FlexBox>
								</FlexInner>
							</FlexBox>
							<FlexBox>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={35}>
											<Title color='gold'>{t('skill')}</Title>
										</FlexInner>
										<FlexInner>
											<Title color='white'>{quest.skill}</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={35}>
											<Title color='gold'>{t('experience')}</Title>
										</FlexInner>
										<FlexInner>
											<Title color='white'>{quest.experience}</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
							</FlexBox>
							<FlexBox>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={35}>
											<Title color='gold'>{t('type')}</Title>
										</FlexInner>
										<FlexInner>
											<Title color='white'>{quest.type}</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
								<FlexInner>
									<FlexBox>
										<FlexInner percent={35}>
											<Title color='gold'>{t('gold')}</Title>
										</FlexInner>
										<FlexInner>
											<Title color='white'>{quest.gold}</Title>
										</FlexInner>
									</FlexBox>
								</FlexInner>
							</FlexBox>
						</MarginDiv>
					</Link>
				</RoundCard>
			))}
		</FlexBoxCustom>
	) : (
		<div className='search-message'> No quests found</div>
	);
};

export default QuestSearchResult;
