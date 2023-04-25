import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import db from '../firebase/index';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';


//const db = getFirestore();

const Buyer = ( props ) => {
    const [approvers, setApprovers] = useState([]);
    const [approversName, setApproversName] = useState('');

    const fetchApprovers = async () => {
        const customQuery = query(collection(db, "Voters"));
        const querySnapshot = await getDocs(customQuery);
        let approversArray = [];
        let approverObj = {};
        const array2 = querySnapshot.docs.map((doc) => (doc.data().data));
        console.log(array2);
        setApprovers(array2);
    }

    useEffect(() => {
        fetchApprovers();
    }, []);

    useEffect(() => {
        console.log("approvers", approvers);
    }, [approvers]);

    return (
            <Container>
                <Card>
                    <Card.Header className='text-center'>
                        <h1>Water quality: </h1>
                        <h1>List of approvers:</h1>
                        <ListGroup as="ol" numbered>
                            {approvers.map(approver => 
                                <ListGroup.Item as='li' className="d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{approver.name}</div>
                                        {approver.email}
                                    </div>
                                </ListGroup.Item>)}
                        </ListGroup>
                        <h2>Your Ethereum account address is:</h2>
                        <h2>{props.account}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter price to make a purchase</Form.Label>
                                <Form.Control type="number" placeholder="Enter the price in eth" />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Purchase</Button>
                        </Form>
                    </Card.Body>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Thank you the purchase! Leave a rating</Form.Label>
                                <Form.Control type="number" placeholder="Enter your rating (0-5)" />
                            </Form.Group>
                            <Button variant='primary' type='submit'>Submit Rating</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
    );
};

export default Buyer;