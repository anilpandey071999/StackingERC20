import { useEffect, useState } from "react";
import { ethers } from "ethers";
import TokenContract from "../../artifacts/contracts/task3.sol/StackingERC20.json"
import { Alert, Card,Container,Nav,NavDropdown, Navbar,Button, Form } from "react-bootstrap";

// token deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Greeter deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
const tokenAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
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