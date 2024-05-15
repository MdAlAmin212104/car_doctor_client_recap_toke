import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
      baseURL: 'https://car-doctor-steel.vercel.app',
      withCredentials : true,
})
const UseAxiosSecure = () => {
      const { logOut } = useContext(AuthContext)
      const navigate = useNavigate()
      useEffect(() => {
            axiosSecure.interceptors.response.use(res => {
                  return res;
            }, err => {
                  console.log('error tracked in the interceptor', err.response);
                  if (err.response.status === 401 || err.response.status === 403) {
                        console.log('logout the user');
                        logOut()
                              .then(res => {
                                   navigate('/login');
                              })
                              .catch(err => console.log(err.message))
                  }
            })
      },[])
      return axiosSecure;
};

export default UseAxiosSecure;