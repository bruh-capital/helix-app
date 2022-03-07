export default function handler(req, res) {
	res.status(200).json({
		"timestamp": "2020-01-01",
		"stakepercent": 90,
	});
}