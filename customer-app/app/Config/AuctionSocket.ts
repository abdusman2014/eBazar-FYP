import { io } from "socket.io-client";
const socket = io.connect("http://localhost:4000");
socket.on("connection",(soc)=>{
    console.log('conn')
})
export default socket;