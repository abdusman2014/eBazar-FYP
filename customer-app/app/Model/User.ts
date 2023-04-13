import Address from "./Address";
import Gender from "./Gender";

interface User{
    uid: string,
    name: string,
    image: string | null,
    email: string | null,
    age: number,
    gender: string,
    phoneNo: string,
    orders: string[],
    addresses: Address[],
}

export default User;