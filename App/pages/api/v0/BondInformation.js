import { getPythProgramKeyForCluster, PythConnection } from "@pythnetwork/client"

const pythConnection = new PythConnection(
	solanaWeb3Connection,
	getPythProgramKeyForCluster(solanaClusterName)
); 

///////////////////////////////////////////////////////////////////////////////////////////////////	
// API route that handles bond information fetching for frontend
export default function handler(req, res) {
	//////////////////////////////////////////////////
	// Main constant data
	const BondAssets = [
		{
			Name: 'SOL',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'So11111111111111111111111111111111111111112'
		},
		{
			Name: 'USDC',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
		},
		{
			Name: 'wUST',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: 'CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm',
		},
		/*FIXME(millionz): Implement!
		{
			Name: 'UXD',
			Price: 'N/A',
			Roi: 'N/A%',
			Address: '????',
		},
		{
			Name: 'SOL-HLX LP',
			Price: 'N/A',
			Roi: 'N/A%',
			LocalNetAddress: '',
			TestNetAddress: '',
			MainNetAddress: '',
		},*/
	];

	//////////////////////////////////////////////////
	// Fetch Pyth values for this stuff lol

	//////////////////////////////////////////////////
	// Update ROI

	//////////////////////////////////////////////////
	// Return response
	res.status(200).json(BondAssets);
}