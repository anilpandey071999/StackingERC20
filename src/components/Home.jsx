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

const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const tokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

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
  const [show, setShow] = useState(true);

  const handleChange = (e) => {
    setFname(e.target.value);
  };
  useEffect(() => {
    timers();
    setInterval(()=>{
      timers();
    },10000)
    checkAllowance();
    contractBalance();
  });
  const contractBalance = async () => {
    try {
      const _contractBalance = await tokenContract.balanceOf(contractAddress);
      setBalance(ethers.utils.formatEther(_contractBalance.toString()));
    } catch (error) {
      setInterval(() => {
        setErrors("");
      }, 700);
      setErrors(error.data.message);
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
      setInterval(() => {
        setErrors("");
      }, 700);
      setErrors(error.data.message);
    }
  };

  const stackToken = async () => {
    try {
      await stackingContract.stackingToken(stackingAmount);
    } catch (error) {
      setInterval(() => {
        setErrors("");
      }, 700);
      setErrors(error.data.message);
    }
  };

  const withdrawal = async () => {
    try {
      await stackingContract.withdrawal();
    } catch (error) {
      setInterval(() => {
        setErrors("");
      }, 700);
      setErrors(error.data.message);
    }
  };

  const timers = async () => {
    try {
      let a = await stackingContract.reamingTime();
      console.log("Timer-> ", a);
      //    new Date(a.stackingTime.toString());
      let remaingTime =
        3600 -
        (parseInt(a.currentBlockTime.toString()) -
          parseInt(a.stackingTime.toString()));
      console.log(
        "date->",
        3600,
        (remaingTime / 60),
        (parseInt(a.currentBlockTime.toString()) -
          parseInt(a.stackingTime.toString()))
      );
      setTime(remaingTime / 60);
    } catch (error) {
      setInterval(() => {
        setErrors("");
      }, 700);
      setErrors(error.data.message);
    }
  };

  return (
    <div>
      <WalletBalance />

      {errors ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {" "}
          {errors}{" "}
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
            Withdrawal after:- {timer < 0 ? 0 : timer} min <br></br>
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

      {/* <div
        style={{
          position: "absolute",
          left: "80%",
          top: "10%",
          // transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{ border: "1px solid black", padding: 20 }}>
          <div className="row">
            <div className="col-md-12">
              <Form.Group className="mb-3">
                <h5>Contract Balance:- {balance}</h5>
                <Form.Label htmlFor="inputPassword5">
                  Enter Stacking Amount{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={stackingAmount}
                  onChange={handleChange}
                  style={{ marginBottom: 10 }}
                />
                <Button variant="outline-primary" onClick={() => stackToken()}>
                  Primary
                </Button>{" "}
              </Form.Group>
              <Form.Group className="mb-3">
                Withdrawal after:- {timer < 0 ? 0 : timer} min <br></br>
                <Button
                  variant="outline-primary"
                  onClick={() => withdrawal()}
                  style={{ marginTop: 10 }}
                >
                  withdrawal
                </Button>{" "}
              </Form.Group>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
