import * as request from "../request";

export const get = async () => {
  const path = "/BomNgoai";
  const humidityApi = await request.getApi(path);
  return humidityApi;
};

// export const set = async (option, content) => {
//     const path = `users/${option}`;
//     request.setApi(path, content);
// };

export const update = async (content) => {
  const path = "/";
  request.updateApi(path, content);
};
