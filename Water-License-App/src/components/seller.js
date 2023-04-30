import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import myContract from "../WaterLicense.json"
import Web3 from 'web3';

const Seller = ( props ) => {
    const [_owner, setOwner] = useState('');
    const [licenseStatus, setLicenseStatus] = useState('');
    const [currentPhase, setCurrentPhase] = useState('');
    const [voterAccount, setVoterAccount] = useState('');
    const [weightage, setWeightage] = useState(0);
    const [newPhase, setNewPhase] = useState(0);
    const [TokenValue, setTokenValue] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [newOwner, SetNewOwner] = useState('');

    const displayOwner = async () => {
        const a = await props.contract.methods.owner().call();
        setOwner(a);
    }

    const displayLicenseStatus = async () => {
        const a = await props.contract.methods.isLicenseApproved().call();
        setLicenseStatus(a);
    }

    const displayTokenValue = async () => {
        const a = await props.contract.methods.tokenValue().call();
        setTokenValue(a);
    }

    const displayTokenId = async () => {
        const a = await props.contract.methods.waterQuality().call();
        setTokenID(a);
    }

    const getCurrentPhase = async () => {
        const a = await props.contract.methods.state().call();
        setCurrentPhase(a);
    }

    const registerVoter = async ( event ) => {
        event.preventDefault();
        //const result = await props.contract.methods.registerVoter(voterAccount, weightage).send({from: props.account})
        //    .then((response) => {
        //        console.log(response);
        //    }).catch((error) => {
        //        console.log(error);
        //    });
        
        const functionAbi = props.contract.methods.registerVoter(voterAccount, weightage).encodeABI();
        const gas = await props.contract.methods.registerVoter(voterAccount, weightage).estimateGas({ from: props.account });
        const transactionParameter = {
        from: props.account,
        to: props.contract._address,
        data: functionAbi,
        //value: parseInt(Web3.utils.toWei('0.01', 'ether')).toString(16)
        gas: parseInt(gas).toString(16)
        };

        await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameter]
        })
        .then((trxHash) => {
            console.log(trxHash);
        })
        .catch((error) => {
            console.log(error);
        });
        
        event.target.reset();
    }

    const changePhase = async ( event ) => {
        event.preventDefault();
        //const result = await props.contract.methods.changePhase(newPhase).send({from: props.account})
        //    .then((response) => {
        //        console.log(response);
        //    }).catch((error) => {
        //        console.log(error);
        //    });

        const functionAbi = props.contract.methods.changePhase(newPhase).encodeABI();
        const gas = await props.contract.methods.changePhase(newPhase).estimateGas({ from: props.account });
        const transactionParameter = {
        from: props.account,
        to: props.contract._address,
        data: functionAbi,
        //value: parseInt(Web3.utils.toWei('0.01', 'ether')).toString(16)
        gas: parseInt(gas).toString(16)
        };

        await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameter]
        })
        .then((trxHash) => {
            console.log(trxHash);
        })
        .catch((error) => {
            console.log(error);
        });

        event.target.reset();
    }

    const mintToken = async () => {
        //const result = await props.contract.methods.mintToken().send({from: props.account, gas: "1000000"});

        const functionAbi = props.contract.methods.mintToken().encodeABI();
        const gas = await props.contract.methods.mintToken().estimateGas({ from: props.account });
        const transactionParameter = {
        from: props.account,
        to: props.contract._address,
        data: functionAbi,
        //value: parseInt(Web3.utils.toWei('0.01', 'ether')).toString(16)
        gas: parseInt(gas).toString(16)
        };

        await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameter]
        })
        .then((trxHash) => {
            console.log(trxHash);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const changeOwner = async ( event ) => {
        event.preventDefault();
        const functionAbi = props.contract.methods.setNewOwner(newOwner).encodeABI();
        const gas = await props.contract.methods.setNewOwner(newOwner).estimateGas({ from: props.account });
        const transactionParameter = {
        from: props.account,
        to: props.contract._address,
        data: functionAbi,
        //value: parseInt(Web3.utils.toWei('0.01', 'ether')).toString(16)
        gas: parseInt(gas).toString(16)
        };

        await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameter]
        })
        .then(async (trxHash) => {
            console.log(trxHash);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // const TransferLicense = async () => {
    //     //event.preventDefault();
    //     console.log("line1");
    //     const functionAbi = await props.contract.methods.transferLicense().encodeABI();
    //     console.log("afterfunction ABHi");
    //     const gas = await props.contract.methods.transferLicense().estimateGas({ from: props.accont });
    //     console.log("tokenValue", TokenValue);
    //     const transactionParameter = {
    //     from: props.account,
    //     to: props.contract._address,
    //     data: functionAbi,
    //     //value: parseInt(Web3.utils.toWei(TokenValue, 'ether')).toString(16),
    //     gas: parseInt(gas).toString() 
    //     };
    //     console.log("hihi");
    //     await window.ethereum.request({
    //         method: "eth_sendTransaction",
    //         params: [transactionParameter]
    //     })
    //     .then((trxHash) => {
    //         console.log(trxHash);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });        
    // }

    const renewLicense = async ( event ) => {
        event.preventDefault();
        const functionAbi = props.contract.methods.renewLicense().encodeABI();
        const gas = await props.contract.methods.renewLicense().estimateGas({ from: props.account });
        const transactionParameter = {
        from: props.account,
        to: props.contract._address,
        data: functionAbi,
        //value: parseInt(Web3.utils.toWei('0.01', 'ether')).toString(16)
        gas: parseInt(gas).toString(16)
        };

        await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameter]
        })
        .then(async (trxHash) => {
            console.log(trxHash);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(licenseStatus);
    }, [licenseStatus]);

    return (
        <>
            <Container>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>Register Voters here</h1>
                        <h2>Your Ethereum account address is:</h2>
                        <h2>{props.account}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={registerVoter}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Voter account</Form.Label>
                                <Form.Control type="text" placeholder="Enter the ethereum account address of the voter" onChange={(event) => setVoterAccount(event.target.value)} />
                                <Form.Label>Set weightage</Form.Label>
                                <Form.Control type="number" placeholder="Enter the weight to be assigned to the voter" onChange={(event) => setWeightage(event.target.value)} />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Register</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>Mint token and transfer ownership here</h1>
                    </Card.Header>
                    <Card.Body>
                        <Button variant='primary' type='submit' onClick={mintToken}>Mint token</Button>
                    </Card.Body>
                    <Card.Body>
                        <Form onSubmit={changeOwner}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>To address</Form.Label>
                                <Form.Control type="text" placeholder="Enter the address of new owner" onChange={(event) => SetNewOwner(event.target.value)} />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Set new owner</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>Set phases functions here</h1>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={changePhase}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Change phase</Form.Label>
                                <Form.Control type="text" placeholder="Enter the phase to set (0-2)" onChange={(event) => setNewPhase(event.target.value)} />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Change phase</Button>
                        </Form>
                    </Card.Body>
                    <Card.Body>
                        <Button variant='primary' type='submit' onClick={getCurrentPhase}>Get current phase</Button>
                        <h2>{`${currentPhase}`}</h2>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>View contract states/variables here</h1>
                    </Card.Header>
                    <Card.Body>
                        <Button variant='primary' type='submit' onClick={displayOwner}>Owner</Button>
                        <h2>{_owner}</h2>
                        <Button variant='primary' type='submit' onClick={displayLicenseStatus}>isLicenseApproved</Button>
                        <h2>{`${licenseStatus}`}</h2>
                        <Button variant='primary' type='submit' onClick={displayTokenValue}>tokenValue</Button>
                        <h2>{`${TokenValue}`}</h2>
                        <Button variant='primary' type='submit' onClick={displayTokenId}>Token ID/Water Quality</Button>
                        <h2>{`${tokenID}`}</h2>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>Renew License here</h1>
                    </Card.Header>
                    <Card.Body>
                        <Button variant='primary' type='submit' onClick={renewLicense}>Renew License</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Seller;