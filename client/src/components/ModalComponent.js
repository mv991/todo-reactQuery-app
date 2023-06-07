import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import ToDoItem from './TodoItem';
import InputArea from './InputArea';
import {useMutation,useQueryClient}  from '@tanstack/react-query';
import {postToDb } from '../api/CreateToDo';
import './Modal.css';



function ModalComponent(p){
const  MydModalWithGrid = (props) => {   
const [items, setItems] = useState([]);

function addItem(title) {
  if(!title){alert("Please add a todo");}
  else {setItems(prevItems => {
      return [...prevItems, {title:title, completed:false,}];});}}

 function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }
  
  const queryClient = useQueryClient();
  
  const addTodoMutation = useMutation({
    mutationFn:  postToDb,
    onMutate: async (newTodo) => {
     await queryClient.cancelQueries({ queryKey: ['todos'] })
     const previousTodos = queryClient.getQueryData(['todos'])
    queryClient.setQueryData(['todos'], (old) => [...old, {todos:[...newTodo]}])
    return { previousTodos }
  },
  // If the mutation fails,
  // use the context returned from onMutate to roll back
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
  // Always refetch after error or success:
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

function addnote(items) {
  if(items.length===0) {
    alert("Todo List cannot be empty")
  }
  else {
    addTodoMutation.mutate(items)
  }
  
  }
return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" >
      <Container>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='heading'>
        <h1> Add a todo list:</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        
          <Row className='form'>
            <Col xs={12} md={12}>
         <InputArea onAdd={addItem} />
            </Col>
          </Row>
           <Row>
            { items.map((todoItem, index) => (
             
             <ToDoItem
              id = {index}
              key={index}
              text={todoItem.title}
                onChecked={deleteItem}
                
            />
          ))}
          </Row>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() =>{ addnote(items); props.onHide()}}>Add</Button>
      </Modal.Footer>
      </Container>
    </Modal>
  );
  }



const [modalShow, setModalShow] = useState(false);
return (
   <div className='addButton'>
    
      <Button variant="outline-dark" onClick={() => setModalShow(true)}>
      + Add  new Todo's 
      </Button>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)}  />
    
    
   
  </div>

)}
export default ModalComponent

