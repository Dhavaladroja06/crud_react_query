import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchData = async () => {
  const response = await axios.get("http://192.168.1.13:3000/todos");
  return response.data;
};

export const useTodoApi = () => {
    return useQuery({
      queryKey: ["fetchData"],
      queryFn: fetchData,
    });
  };