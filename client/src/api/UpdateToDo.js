import axios from "axios";
export async function  updateToDo ({todo,pid})  {
    return axios.patch(`https://todo-app-react-580d.onrender.com/${pid}/${todo._id}`, {
      todo
    })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
        
     
  }