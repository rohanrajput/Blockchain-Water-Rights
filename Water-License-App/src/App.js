import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Web3 from 'web3';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Layout from './layout';
import Voter from './components/voter';
import Buyer from './components/buyer';
import Seller from './components/seller';
import myContract from "./WaterLicense.json"

function App() {
  const [account, setAccount] = useState("");
  const [deployedContract, setDeployedContract] = useState('');

  const initializeContract = async () => {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = myContract.networks[networkId];
    const MyContract = new web3.eth.Contract(
        myContract.abi,
        deployedNetwork && deployedNetwork.address
    );
    setDeployedContract(MyContract);
    console.log("Contract address", MyContract._address);
  }

  async function loadWeb3() {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await window.web3.eth.getAccounts();
        console.log(accounts);
        setAccount(accounts[0]);
    }
  }

  useEffect(() => {
    loadWeb3();

    window.ethereum.on("accountsChanged", function (newAccounts) {
      setAccount(newAccounts[0]);
    })
  }, [account]);

  useEffect(() => {
    initializeContract();
  }, []);

  return (
    <>
    <Router>
      <Navbar bg="dark" variant="dark" sticky='top'>
        <Container>
          <Navbar.Brand href="/">CSE 4/526 Water License Dapp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Voter</Nav.Link>
            <Nav.Link as={Link} to="/buyer">Buyer</Nav.Link>
            <Nav.Link as={Link} to="/seller">Seller</Nav.Link>
          </Nav>
          <Button onClick={loadWeb3}>Connect to Metamask</Button>
        </Container>
      </Navbar>
        <Routes>
          <Route path="/" component={Voter} element={<Voter account={account} contract={deployedContract} />} />
          <Route path="buyer" component={Buyer} element={<Buyer account={account} contract={deployedContract} />} />
          <Route path="seller" component={Seller} element={<Seller account={account} contract={deployedContract} /> }/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
