import { client } from "@/httpClient";

// const USER_ID = 346;

export const getUsers = () => {
  return client.get('/users');
};

export const getUser = (id) => {
  return client.get(`/users/${id}`);
};

export const createUser = (name, email) => {
  return client.post('/users', {
    name,
    email,
  });
};