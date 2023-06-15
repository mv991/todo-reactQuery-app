import React from "react";
import {deleteFromDb} from '../api/DeleteToDO';
import {useMutation,useQueryClient}  from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import {updateToDo} from '../api/UpdateToDo'


function Note(props) {
 
  const update = useMutation({
    mutationFn: updateToDo,
    // When mutate is called:
    onMutate: async ({todo,pid}) => {
    // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos', todo._id] })

      // Snapshot the previous value
      const previousTodo = queryClient.getQueryData(['todos',todo._id ])
  
      // Optimistically update to the new value
      queryClient.setQueryData(['todos', todo._id,todo])
  
      // Return a context with the previous and new todo
      return { previousTodo, todo }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ['todos', context.newTodo.id],
        context.previousTodo,
      )
    },
    // Always refetch after error or success:
    onSettled: (newTodo) => {

      queryClient.invalidateQueries({ queryKey: ['todos', newTodo.id] })
    
    }})

  function handleClick(item,pid) {
    item.completed = !(item.completed);
    update.mutate({todo:item,pid:pid})
  }
  
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation({
    mutationFn:  deleteFromDb,
    onMutate: async (id) => {
     await queryClient.cancelQueries({ queryKey: ['todos'] })
     const previousTodos = queryClient.getQueryData(['todos'])
    queryClient.setQueryData(['todos'], (old) => old.filter(t => t._id!==id))
    return { previousTodos }
  }, 
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
  // Always refetch after error or success:
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    

  },

})
  
const handleDelete = (id) => {
  addTodoMutation.mutate(id)
}



  return (
    <div className="note">
      {  props.note.map((item,index) => {
        return <ul id={index}> <li style = {{textDecoration:item.completed?"line-through":"none"}}  onClick={() => {handleClick(item,props.id)}} key={item._id} >{item.title} </li></ul>
      })}
      <button disabled = {props.id?false:true} onClick={() => {handleDelete(props.id)}}><DeleteIcon /></button>
    </div>
  );
}


export default Note;