import React from 'react'
 function Button({color,text,onclick}) {
  
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button style={{backgroundColor:color}} onClick={{onclick}}>{text}</button>
    </div>
  )
}

export default Button;