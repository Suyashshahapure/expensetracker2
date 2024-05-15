import React, { useEffect, useState } from "react";
import Expense from "./components/Expense";
import Header from "./components/Header";
import RecentTransection from "./components/RecentTransection";
import Wallet from "./components/Wallet";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  var array = localStorage.getItem('localtransaction');
  var localbalance = localStorage.getItem("balance");
  var localexpense = localStorage.getItem("expense");
  array = JSON.parse(array);
  const [balance, setBalance] = useState(localbalance || 5000);
  const [transactions, setTransactions] = useState(array || []);
  const [expense, setExpense] = useState(localexpense || 0);
  // useEffect(() => {
  //   // Initialize balance once when the component mounts
  //   setBalance(5000);
  //   // setTransactions(localStorage.getItem("localtransaction"))
  // }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    localStorage.setItem("localtransaction", JSON.stringify(transactions));
    let total = 0;
      transactions.forEach(transaction => {
        total += parseFloat(transaction.price);
        console.log(total)
      });
      // setBalance(prev => (prev + expense));
      if(total > balance) {
        alert("Insufficient Balance")
        return;
      }
      setBalance(prev => (prev - total));
      setExpense(total);
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance])

  useEffect(() => {
    localStorage.setItem("expense", expense);
  }, [expense])

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: uuidv4()  , 
      ...transaction,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const addExpense = (amount) => {
    const totalAmount = parseFloat(expense + amount) ;
    setBalance(prev => prev + expense);
    setExpense(totalAmount);
  };

  const addBalance = (amount) => {
    const totalAmount = parseFloat(balance + amount);
    if (totalAmount < 0) {
      alert('You cannot spend more than your balance');
      return;
    }
    setBalance(totalAmount);
  };

  const calculateTotalExpense = () => {
    let total = 0;
    transactions.forEach(transaction => {
      total += parseFloat(transaction.price);
      console.log(total)
    });
    return total;
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="wallet" >
        <Wallet  addBalance={addBalance} balance={balance} /></div>
        <div className="expense">
        <Expense  addTransaction={addTransaction} addExpense={addExpense} expense={expense} transactions={transactions} setTransactions={setTransactions} /></div>
      </div>
      <div>
     
       
        <RecentTransection transactions={transactions} addTransaction={addTransaction} addExpense={addExpense} setBalance={setBalance} setTransactions={setTransactions}/>
        {transactions.length > 0 && <div><BarChart data={transactions}/></div>}
        {transactions.length > 0 && <div><PieChart data={transactions}/></div>}
      </div>
      
    </div>
  );
}

export default App;
