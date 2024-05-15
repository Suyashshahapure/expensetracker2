import React, { useState } from 'react';
import Modal from 'react-modal';



Modal.setAppElement('#root');

function AddBalance ({ isOpen, closeModal, addbalance, text }) {
  const [Amount, setAmount] = useState(0)


  const handleChange = (e) => {

    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Amount);
  addbalance(parseFloat(Amount));
  
  setAmount(e.target.value);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add balance Modal"
    >
      <div>
        <button onClick={closeModal}>Close</button>
      </div>
      <h2>Add Balance</h2>
      <form className="add-balance-form" onSubmit={handleSubmit}>
      
        <input type="number" placeholder="Income Amount" name="price" value={Amount} onChange={handleChange} required />
     
        
        <button type="submit" >Add balance</button>
        <button type="submit">Cancel</button>
      </form>
    </Modal>
  );
}

export default AddBalance;
