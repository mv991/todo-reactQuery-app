import axios from "axios";
export async function deleteFromDb (id)   {
await axios.delete(`http://localhost:8000/${id}`, {
      
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   