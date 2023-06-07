import axios from "axios";
export async function  updateToDo ({todo,pid})  {
    return axios.patch(`http://localhost:8000/${pid}/${todo._id}`, {
      todo
    })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
        
     
  }