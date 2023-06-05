import * as request from "../request";

export const get = async (stream = "") => {
  const path = "/camera_stream/" + stream;
  const humidityApi = await request.getApi(path);
  return humidityApi;
};

// export const set = async (option, content) => {
//     const path = `users/${option}`;
//     request.setApi(path, content);
// };

export const update = async (content, id) => {
  const path = "/products/" + id;
  await request.updateApi(path, content);
};
