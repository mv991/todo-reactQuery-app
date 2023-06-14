import axios from "axios";
export async function  postToDb (todo)  {
    console.log("posting to db",todo);
    return axios.post(`https://todo-app-react-580d.onrender.com/`, {
      todo
    })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
        
     
  }

  