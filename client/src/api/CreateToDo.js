import axios from "axios";
export async function  postToDb (todo)  {
    console.log("posting to db",todo);
    return axios.post(`http://localhost:8000`, {
      todo
    })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
        
     
  }

  