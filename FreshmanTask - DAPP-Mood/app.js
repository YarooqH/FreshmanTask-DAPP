const nameCollectorContractAdd = "0x20775467f54CA6F30F0841932102e00C14b8AAB9";
const nameCollectorContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getName",
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

let nameContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then(accounts => {
        signer = provider.getSigner(accounts[0]);
        nameContract = new ethers.Contract(
            nameCollectorContractAdd,
            nameCollectorContractABI,
            signer
        );
    });
});

const getName = async () => {
    const getNamePromise = nameContract.getName();
    const displayName = document.getElementById("display-name");
    const name = await getNamePromise;
    displayName.innerText = name;
    // console.log(name);
}

const setName = async () => {
    const name = document.getElementById("full-name").value;
    const setNamePromise = await nameContract.setName(name);
    await setNamePromise;
}