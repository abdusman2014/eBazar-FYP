const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const generateID = () => Math.random().toString(36).substring(2, 10);
let productList = [];
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("addProduct", (product) => {
    console.log(product);
    productList.unshift({
      id: generateID(),
      name: product.name,
      price: product.price,
      image_url:
        "https://www.shutterstock.com/image-photo/white-baseball-cap-isolated-on-260nw-1472749184.jpg",
      description: product.description,
        owner: product.userId,
    });
	socketIO.emit("getProducts", productList);
  });
  socket.on("updatePrice", (data) => {
    let result = productList.filter(
      (product) => product.id === data.selectedProduct.id
    );
    result[0].price = data.newPrice;
    //result[0].owner = data.userId;
    console.log("updated");
    socketIO.emit("getProducts", productList);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});
app.get("/products", (req, res) => {
  console.log("req");
  res.json(productList);
});
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
