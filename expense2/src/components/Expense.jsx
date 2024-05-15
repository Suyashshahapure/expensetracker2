import React, { useState } from 'react';
import AddExpenseForm from './AddexpenseForm';
import './Expense.css'

function Expense({ addTransaction, addExpense, expense, transactions, setTransactions }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const calculateTotalExpense = () => {
    let total = 0;
    transactions.forEach(transaction => {
      total += parseFloat(transaction.price);
      console.log(total)
    });
    return total;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='Expense-Div'>
      <div className="Expense-Text">
      <p>Expenses:</p>
      <p className='Expense-p'>{expense}</p>
      </div>
      <button className='expense-btn' onClick={openModal}>Add Expense</button>
      <AddExpenseForm isOpen={isModalOpen} closeModal={closeModal} addTransaction={addTransaction} addExpense={addExpense}  />
    </div>
  )
}

export default Expense;
