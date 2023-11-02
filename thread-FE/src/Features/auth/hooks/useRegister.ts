import { ChangeEvent, useState } from "react";
import { api } from "../../../libs/api/api";

export function useRegister() {
  const [newUser, setNewUser] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await api.post("/register", newUser);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return { newUser, handleChange, handleRegister };
}
