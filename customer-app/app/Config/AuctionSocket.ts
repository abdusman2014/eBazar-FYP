import { io } from "socket.io-client";
const socket = io.connect("http://192.168.72.240:4000");
socket.on("connection",(soc)=>{
    console.log('conn')
})
export default socket;