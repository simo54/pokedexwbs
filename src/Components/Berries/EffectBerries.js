import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../Styles/Berries.css";

export default function MyVerticallyCenteredModal({ titlePopUp, category, cost, effect }) {
  const [smShow, setSmShow] = React.useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className='text center'>
        View Stats
      </Button>
      <Modal size='sm' show={smShow} onHide={() => setSmShow(false)} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>
            <div className='text-center'>
              <h3>{titlePopUp}</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <li className='text-center mt-2'>Category</li>
          <li className='category text-center mt-2'>
            <span>{category}</span>
          </li>
          <li className='text-center mt-2'>Cost</li>
          <li className='category text-center mt-2'>
            <span>{cost}</span>
          </li>
          <li className='text-center mt-2'>Effect</li>
          <li className='category text-center mt-2'>
            <span>{effect}</span>
          </li>
        </Modal.Body>
      </Modal>
    </>
  );
}
