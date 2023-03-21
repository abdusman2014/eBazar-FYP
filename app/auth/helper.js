// import { Auth } from "aws-amplify";

// const getUser = async () => {
//   try {
//     // check if a logged in user already exists
//     const c = await Auth.currentAuthenticatedUser();
//     return c.signInUserSession?.idToken?.payload ?? null;
//   } catch (error) {
//     console.log("AuthHelper error", error);
//     return null;
//   }
// };

// const getToken = async () => {
//   try {
//     const c = await Auth.currentAuthenticatedUser();
//     return c.signInUserSession?.idToken.jwtToken ?? null;
//   } catch (error) {
//     console.log("Error getting the auth token", error);
//   }
// };

// export default {
//   getUser,
//   getToken,
// };
