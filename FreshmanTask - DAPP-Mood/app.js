const moodDiaryContractAdd = "0x2d7Af4843300df5347eB23f230A76a7dc29A65dD";
const moodDiaryContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let moodContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then(accounts => {
        signer = provider.getSigner(accounts[0]);
        moodContract = new ethers.Contract(
            moodDiaryContractAdd,
            moodDiaryContractABI,
            signer
        );
    });
});

const getMood = async () => {
    const getMoodPromise = moodContract.getMood();
    const displayMood = document.getElementById("display-mood");
    const mood = await getMoodPromise;
    displayMood.innerText = mood;
}

const setMood = async () => {
    const mood = document.getElementById("full-mood").value;
    const setMoodPromise = await moodContract.setMood(mood);
    await setMoodPromise;
}