import AxiosService from "./AxiosService";
const headerConfig = {
    headers: { 
        "x-access-token": localStorage.getItem("token")
     }
}

const axiosService = new AxiosService();

class UserService {

   
    Signup(url, data) {
        return axiosService.Post(url, data);
    }

    Login(url, data){
        return axiosService.Post(url, data)
    }
   
}

export default UserService;