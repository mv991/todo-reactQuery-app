import axios from "axios";
export async function deleteFromDb (id)   {
await axios.delete(`https://todo-app-react-580d.onrender.com/${id}`, {
      
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   