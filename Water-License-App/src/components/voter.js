import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import db from '../firebase/index';
import { collection, addDoc, getFirestore, query, getDocs } from 'firebase/firestore';

import { Button, Card, Container, Form } from 'react-bootstrap';
import myContract from "../WaterLicense.json"
import { async } from '@firebase/util';

const Voter = ( props ) => {
    const [voterObj, setVoterObj] = useState({
        name: '',
        email: '',
        approval: 0,
        waterRating: 0,
        address: props.account
    });

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        const result = await props.contract.methods.castVote(voterObj.approval, voterObj.waterRating).send({from: props.account, gas: "1000000"})
            .then(async (response) => {
                const customQuery = query(collection(db, "Voters"));
                const querySnapshot = await getDocs(customQuery);
                const array2 = querySnapshot.docs.map((doc) => (doc.data().data['address']));
                if(!array2.includes(voterObj.address)) {
                    addDoc(collection(db, "Voters"), {
                        data: {...voterObj, address: props.account}
                    })
                }
            })
            .catch((error)=> {
                console.log(error);
            });
    };

    return (
        <>
            <Container>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>Cast your vote</h1>
                        <h2>Your Ethereum account address is:</h2>
                        <h2>{props.account}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name of the Voter</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" onChange={(event) => setVoterObj({...voterObj, name: event.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address of the Voter</Form.Label>
                                <Form.Control type="text" placeholder="Enter your email address" onChange={(event) => setVoterObj({...voterObj, email: event.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Please provide approval</Form.Label>
                                <Form.Control type="text" placeholder="Enter 0 to reject 1 to approve" onChange={(event) => setVoterObj({...voterObj, approval: event.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Please enter water rating</Form.Label>
                                <Form.Control type="text" placeholder="Set water rating" onChange={(event) => setVoterObj({...voterObj, waterRating: event.target.value})} />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Cast Vote</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Voter;