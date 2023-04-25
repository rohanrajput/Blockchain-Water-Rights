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

    const displayOwner = async () => {
        const a = await props.contract.methods.owner().call();
        setOwner(a);
    }

    const displayLicenseStatus = async () => {
        const a = await props.contract.methods.isLicenseApproved().call();
        setLicenseStatus(a);
    }

    const getCurrentPhase = async () => {
        const a = await props.contract.methods.state().call();
        setCurrentPhase(a);
    }

    const registerVoter = async ( event ) => {
        event.preventDefault();
        const result = await props.contract.methods.registerVoter(voterAccount, weightage).send({from: props.account})
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }

    const changePhase = async ( event ) => {
        event.preventDefault();
        const result = await props.contract.methods.changePhase(newPhase).send({from: props.account})
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
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
                        <Button variant='primary' type='submit'>Mint token</Button>
                    </Card.Body>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>To address</Form.Label>
                                <Form.Control type="text" placeholder="Enter the address of the recipient" />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Transfer</Button>
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
                        <Button variant='primary' type='submit'>tokenValue</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Seller;