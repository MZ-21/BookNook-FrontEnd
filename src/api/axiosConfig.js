import axios from 'axios'; //use to make http requests

export default axios.create({
    baseURL: 'http://localhost:8080/', //provides base address of api endpoints that our app will be calling
    headers: {"skip-browser-warning": "true"} //overcome restrictions caused by cors
});