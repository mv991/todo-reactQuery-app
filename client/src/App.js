
import React from'react';
import Note from "./components/Note";
import ModalComponent from "./components/ModalComponent";
import { useQuery}  from '@tanstack/react-query';
import { deleteFromDb } from './api/DeleteToDO';
import axios from 'axios';
function App() { 
  
 
  const { isLoading, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      axios
        .get("https://todo-app-react-580d.onrender.com")
        .then((res) => res.data),
  },);
  
  if (isLoading) {  
  return (
    <div className="position-absolute bottom-50 end-50">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
  }
  

  if (error) return 'An error has occurred: ' + error.message


  
  return (

<div className="App">

  <ModalComponent />
      {
          data.map((noteItem) => {
          return <Note note = {noteItem.todos} onDelete = {deleteFromDb} key={noteItem._id} id={noteItem._id} />
            
      

       
      })}
</div>
  );

}

export default App;
