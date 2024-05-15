
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AddExpenseForm({ isOpen, closeModal, addTransaction,addExpense, text, }) {
  const [transaction, setTransaction] = useState({
    title: '',
    price: 0,
    category: 'Entertainment',
    date: new Date().toISOString().substr(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setTransaction({  title: transaction.title,
    price: transaction.price,
    category: transaction.category,
    date: transaction.date,});
    if (!transaction.title || !transaction.price || !transaction.category || !transaction.date) return;
    console.log(transaction)
    addTransaction(transaction)
    addExpense(parseFloat(transaction.price))
    setTransaction({
      title: '',
      price: 0,
      category: 'Entertainment',
      date: new Date().toISOString().substr(0, 10),
    });
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add transaction Modal"
    >
      <div>
        <button onClick={closeModal}>Close</button>
      </div>
      <h2>{text}</h2>
      <form className="add-transaction-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" value={transaction.title} onChange={handleChange} required />
        <input type="number" placeholder="Price" name="price" value={transaction.price} onChange={handleChange} required />
        <select name="category" value={transaction.category} onChange={handleChange} required>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
        </select>
        <input type="date" name="date" value={transaction.date} onChange={handleChange} required />
        <button type="submit">Add transaction</button>
      </form>
    </Modal>
  );
}

export default AddExpenseForm;