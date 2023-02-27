import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		// Save the data to the collection
		const getRes = await fetch(`https://dummyjson.com/products?offset=0&limit=6`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => data.products);

		if (getRes.code) {
			throw new Error('An error occurred while fetching the data');
		}

		const formattedToQuests = getRes.map((quest: any) => {
			return {
				id: quest.id,
				skillTree: quest.category.replace('-', ' '), // 'home-decoration' => 'home decoration'
				skill: quest.brand,
				title: quest.title,
				difficulty: Math.floor(quest.rating),
				experience: quest.stock * 100,
				gold: quest.price,
				type: '-',
				cover: quest.thumbnail
			};
		});

		// Send a response back to the client
		res.status(200).json(formattedToQuests);
	} catch (error) {
		// If the request fails, an error will be thrown
		console.error(error);

		// Send an error response back to the client
		res.status(500).json('An error occurred while fetching the data');
	}
}
