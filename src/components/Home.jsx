import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import StackContract from "../../artifacts/contracts/task3.sol/stackingCoin.json";
import TokenContract from "../../artifacts/contracts/task3.sol/StackingERC20.json";
import { useEffect, useState } from "react";
import {
  Alert,
  Card,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Button,
  Form,
} from "react-bootstrap";
import "../App.css";

const contractAddress = "0xDce073ee2c3C9ad7C6F26BCDbbf7eF13001b2464";
const tokenAddress = "0x0e88B4F60a070aEAc9938b322f35988B90a17877";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const stackingContract = new ethers.Contract(
  contractAddress,
  StackContract.abi,
  signer
);
const tokenContract = new ethers.Contract(
  tokenAddress,
  TokenContract.abi,
  signer
);

const [account] = await window.ethereum.request({
  method: "eth_requestAccounts",
});

function Home() {
  const [balance, setBalance] = useState(0);
  const [stackingAmount, setFname] = useState(0);
  const [errors, setErrors] = useState("");
  const [timer, setTime] = useState(0);
  const [getStackAmount, setAmount] = useState(0);

  const handleChange = (e) => {
    setFname(e.target.value);
  };
  useEffect(() => {
    timers();
    setTimeout(()=>{
      timers();
    },10000)
    stackAmount();
    checkAllowance();
    contractBalance();
  });

  const stackAmount = async () => {
    try {
      const amount = await stackingContract.stackingtokens(account);
      console.log("amount",amount);
      setAmount(ethers.utils.formatEther(amount.toString()));
    } catch (error) {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors(error.message);
    }
  }

  const contractBalance = async () => {
    try {
      const _contractBalance = await tokenContract.balanceOf(contractAddress);
      setBalance(ethers.utils.formatEther(_contractBalance.toString()));
    } catch (error) {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors(error.message);
    }
  };

  const checkAllowance = async () => {
    try {
      let statusOfAllowance = await tokenContract.allowance(
        account,
        contractAddress
      );
      if (statusOfAllowance == 0x00) {
        await tokenContract.approve(
          contractAddress,
          (500 * 10 ** 18).toString()
        );
      }
    } catch (error) {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors(error.message);
    }
  };

  const stackToken = async () => {
    try {
      await stackingContract.stackingToken(stackingAmount);
    } catch (error) {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors(error.message);
    }
  };

  const withdrawal = async () => {
    try {
      await stackingContract.withdrawal();
    } catch (error) {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors(error.message);
    }
  };

  const timers = async () => {
    try {
      let a = await stackingContract.reamingTime();
      // console.log("Timer-> ", a);
      //    new Date(a.stackingTime.toString());
      let remaingTime =
        3600 -
        (parseInt(a.currentBlockTime.toString()) -
          parseInt(a.stackingTime.toString()));
      // console.log(
      //   "date->",
      //   3600,
      //   (remaingTime / 60),
      //   (parseInt(a.currentBlockTime.toString()) -
      //     parseInt(a.stackingTime.toString()))
      // );
      setTime(remaingTime / 60);
    } catch (error) {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors(error.message);
    }
  };

  return (
    <div>
      <WalletBalance />

      {(errors!="") ? (
        <Alert variant="danger" onClose={() => setShow(false)} >
          {errors}
        </Alert>
      ) : (
        <br></br>
      )}

      <Card
        style={{
          width: "25rem",
          height: "20rem",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="mb-9"
      >
        <Card.Header>Contract Balance {balance}</Card.Header>
        <Card.Body>
          <Card.Title>Enter Stacking Amount </Card.Title>
          <Form.Control
            type="text"
            value={stackingAmount}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          <Button
            variant="outline-primary"
            style={{
              position: "absolute",
              top: "50%",
              left: "40%",
            }}
            onClick={() => stackToken()}
          >
            Primary
          </Button>{" "}
          <Card.Text style={{
              position: "absolute",
              top: "65%",
              left: "10%",
            }}>
            Withdrawal after:- {timer < 0 ? 0 : timer} min  <br></br>
            Your Stacked Amount:- {getStackAmount}
          </Card.Text>
          <Button
            variant="outline-primary"
            style={{
              position: "absolute",
              top: "80%",
              left: "10%",
              width: "20rem",
              // height: "20rem",
            }}
            onClick={() => withdrawal()}
            >
            withdrawal
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
