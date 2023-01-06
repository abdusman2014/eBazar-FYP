import Gender from "./Gender";

interface User{
    uid: string,
    name: string,
    image: string | null,
    email: string | null,
    age: number,
    gender: string,
}

export default User;