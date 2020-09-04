import React from "react";
import "../Styles/Berries.css";
import { Button, Modal } from "react-bootstrap";

export default function MyVerticallyCenteredModal({ titlePopUp, category, cost }) {
  const [smShow, setSmShow] = React.useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className='text center'>
        View Stats
      </Button>
      <Modal size='sm' show={smShow} onHide={() => setSmShow(false)} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm' className='text-center'>
            <h3>{titlePopUp}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <li>
            Category: <span className='category'>{category}</span>
          </li>
          <li>
            Cost: <span className='cost'>{cost}</span>
          </li>
        </Modal.Body>
      </Modal>
    </>
  );
}
