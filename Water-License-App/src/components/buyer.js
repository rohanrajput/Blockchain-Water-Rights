import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import db from "../firebase/index";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import Web3 from "web3";

//const db = getFirestore();

const Buyer = (props) => {
  const [approvers, setApprovers] = useState([]);
  const [approversName, setApproversName] = useState("");
  const [etherAmt, setEtherAmt] = useState(0);
  const [waterRating, setWaterRating] = useState(0);

  const fetchApprovers = async () => {
    const customQuery = query(collection(db, "Voters"));
    const querySnapshot = await getDocs(customQuery);
    let approversArray = [];
    let approverObj = {};
    console.log("querySnapshot", querySnapshot);
    console.log("querySnapshotDocs", querySnapshot.docs);
    console.log("querySnapshotDocs.data", querySnapshot.docs[0].data());
    const array2 = querySnapshot.docs.map((doc) => doc.data().data);
    console.log("array2", array2);
    setApprovers(array2);
  };

const handlePurchase = async (event) => {
    event.preventDefault();
    const functionAbi = props.contract.methods.buyWater().encodeABI();
    const transactionParameter = {
    from: props.account,
    to: props.contract._address,
    data: props.contract.methods.buyWater().encodeABI(),
    value: parseInt(Web3.utils.toWei(etherAmt, 'ether')).toString(16)
    };

    await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameter]
    })
    .then((trxHash) => {
        console.log(trxHash);
        addDoc(collection(db, "Buyers"), {
              address: props.account,
              value: etherAmt,
              rating: null,
            });
    })
    .catch((error) => {
        console.log(error);
    });
    event.target.reset();
}

  const handleRating = async (event) => {
    event.preventDefault();

    const functionAbi = props.contract.methods.rating(waterRating).encodeABI();
    const gas = await props.contract.methods.rating(waterRating).estimateGas({ from: props.account });
    const transactionParameter = {
    from: props.account,
    to: props.contract._address,
    data: functionAbi,
    //value: parseInt(Web3.utils.toWei("0.01", 'ether')).toString(16)
    gas: parseInt(gas).toString(16)
};

    await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameter]
    })
    .then(async (trxHash) => {
        console.log(trxHash);
        const customQuery = query(
              collection(db, "Buyers"),
              where("address", "==", props.account), where("rating", "==", null)
            );
            console.log(customQuery);
            const querySnapshot = await getDocs(customQuery);
            console.log(querySnapshot);
            querySnapshot.forEach(async (document) => {
              const docRef = doc(db, "Buyers", document.id);
              await updateDoc(docRef, {
                 rating: waterRating
              });
            });
    })
    .catch((error) => {
        console.log(error);
    });

    event.target.reset();
  };

  useEffect(() => {
    fetchApprovers();
  }, []);

  useEffect(() => {
    console.log("approvers", approvers);
  }, [approvers]);

  return (
    <Container>
      <Card>
        <Card.Header className="text-center">
          <h1>Water quality: </h1>
          <h1>List of approvers:</h1>
          <ListGroup as="ol" numbered>
            {approvers.map((approver) => (
              (approver.name !== undefined)?
              (<ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{approver.name}</div>
                  {approver.email}
                </div>
              </ListGroup.Item>): ""
            ))}
          </ListGroup>
          <h2>Your Ethereum account address is:</h2>
          <h2>{props.account}</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handlePurchase}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter price to make a purchase</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the price in eth"
                onChange={(event) => setEtherAmt(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Purchase
            </Button>
          </Form>
        </Card.Body>
        <Card.Body>
          <Form onSubmit={handleRating}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Thank you the purchase! Leave a rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your rating (0-5)"
                onChange={(event) => setWaterRating(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Rating
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Buyer;
