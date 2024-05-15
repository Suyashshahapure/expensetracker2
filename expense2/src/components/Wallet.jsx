import React,{useState} from 'react'
import AddBalance from './Addbalance';

 function Wallet({addBalance,balance}) {
   
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <p>Wallet Balance:</p>
      <p>{balance}</p>
      <button onClick={openModal}>Add Income</button>
      <AddBalance isOpen={isModalOpen} closeModal={closeModal} addbalance={addBalance}/>
    </div>
  )
}
export default Wallet;
