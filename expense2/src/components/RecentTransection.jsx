import React, { useState } from 'react';
import Modal from 'react-modal';
import AddExpenseForm from './AddexpenseForm'; // Make sure to import the AddExpenseForm component

Modal.setAppElement('#root');

function RecentTransaction({ transactions: initialTransactions, addTransaction, setBalance, addExpense , setTransactions}) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const transactionsPerPage = 3;
  const totalPages = Math.ceil(initialTransactions.length / transactionsPerPage);

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = initialTransactions.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {

    const updatedTransactionsIndex = initialTransactions.findIndex(transaction =>
      transaction.id === id 
     );
    const updatedTransactions = [
     ...initialTransactions.slice(0, updatedTransactionsIndex),
     ...initialTransactions.slice(updatedTransactionsIndex + 1),
    ];
    addExpense(0);
    setTransactions(updatedTransactions);
    // let amount = 0;
    // initialTransactions.forEach(transaction => {
    //   if (transaction.id === id) {
    //     amount += parseFloat(transaction.price);
    //   }
    // });
    // const updatedTransactions = initialTransactions.filter(transaction => transaction.id !== id);
    // setTransactions(updatedTransactions);
  };

  const handleEdit = (id) => {
    const transactionToEdit = initialTransactions.find(transaction => transaction.id === id);
    setOpenEditForm(true);
    setEditFormData(transactionToEdit);
  };
  
  const handleEditTransaction = (editedTransaction) => {
    const updatedTransactionsIndex = initialTransactions.findIndex(transaction =>
      transaction.id === editFormData.id 
     );
    const updatedTransactions = [
     ...initialTransactions.slice(0, updatedTransactionsIndex),
      {id:editFormData.id , ...editedTransaction},
     ...initialTransactions.slice(updatedTransactionsIndex + 1),
    ];
    setTransactions(updatedTransactions);
    setOpenEditForm(false);
  };

  const closeModal = () => {
    setOpenEditForm(false);
  };

  return (
    <div>
      <h2>Recent Transactions</h2>
      <div className="transactions-container">
        {currentTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div>ID: {transaction.id}</div>
            <div>Title: {transaction.title}</div>
            <div>Amount: {transaction.price}</div>
            <div>Date: {transaction.date}</div>
            <div>
              <button onClick={() => handleEdit(transaction.id)}>Edit</button>
              <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <Modal isOpen={openEditForm} onRequestClose={closeModal} contentLabel="Edit transaction Modal">
        <AddExpenseForm isOpen={openEditForm} closeModal={closeModal} addTransaction={handleEditTransaction} addExpense={addExpense} text="Edit Transaction" formData={editFormData} />
      </Modal>
    </div>
  );
}

export default RecentTransaction;
