import { useState } from 'react';
import { ethers } from "ethers";
// token deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Greeter deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
function WalletBalance(){

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        console.log(balance);
        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <div className="card">
            <div>
                <h5>
                    Your Balance: { balance }
                </h5>
                <button onClick={() => getBalance()}>Show My Balance</button>
            </div>
        </div>
    );

};

export default WalletBalance;