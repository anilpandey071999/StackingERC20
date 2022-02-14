import { useEffect, useState } from "react";
import { ethers } from "ethers";
import TokenContract from "../../artifacts/contracts/task3.sol/StackingERC20.json"
import { Alert, Card,Container,Nav,NavDropdown, Navbar,Button, Form } from "react-bootstrap";

// token deployed to: 0x0e88B4F60a070aEAc9938b322f35988B90a17877
// Greeter deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
const tokenAddress = '0x0e88B4F60a070aEAc9938b322f35988B90a17877';
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();
const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

const tokenContract = new ethers.Contract(tokenAddress, TokenContract.abi,signer);
function WalletBalance(){

    const [balance, setBalance] = useState(0);
    useEffect(()=>{
        getBalance();
    })
    
    const getBalance = async () => {
        const _contractBalance = await tokenContract.balanceOf(account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(_contractBalance.toString());
        setBalance(ethers.utils.formatEther(_contractBalance.toString()));
    };

    return (
        <div>
        <Navbar>
        <Container>
          <Navbar.Brand href="#home"> Account: {account}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            Your Balance: { balance } 
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    );

};

export default WalletBalance;