const moodDiaryContractAdd = "0x20775467f54CA6F30F0841932102e00C14b8AAB9";
const moodDiaryContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"mood": "_mood",
				"type": "string"
			}
		],
		"mood": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"mood": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"mood": "",
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