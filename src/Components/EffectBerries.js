import React from "react";
import "../Styles/Berries.css";
import { Button, Modal } from "react-bootstrap";

export default function MyVerticallyCenteredModal() {
  const [smShow, setSmShow] = React.useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className='text center'>
        Stats
      </Button>
      <Modal size='sm' show={smShow} onHide={() => setSmShow(false)} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}
