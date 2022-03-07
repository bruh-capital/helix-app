export default function handler(req, res) {
	res.status(200).json(
		[
			{
				"timestamp": "1646684126091",
				"tvl": 506189124.61,
			},
			{
				"timestamp": "1646684326091",
				"tvl": 481098123.34,
			},
			{
				"timestamp": "1646684226091",
				"tvl": 422498917.83,
			},
			{
				"timestamp": "1646684126091",
				"tvl": 380535344.14,
			},
		]
	);
}