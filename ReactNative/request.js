import { ref, child, get, set, update } from "firebase/database";
import { database } from "./firebase-config";

const dbRef = ref(database);

export const getApi = async (option) => {
  const res = await get(child(dbRef, option));
  return res.val();
};

export const setApi = async (option, content = {}) => {
  set(child(dbRef, option), content);
};

export const updateApi = async (option, content = {}) => {
  update(child(dbRef, option), content);
};

// get(child(dbRef, `users`))
//     .then((snapshot) => {
//         if (snapshot.exists()) {
//             console.log(snapshot.val());
//         } else {
//             console.log('No data available');
//         }
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // set(child(dbRef, `users/2`), {
// //     id: 2,
// //     name: 'aaa',
// // });
