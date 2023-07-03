import axios from "axios";

export const savePlayerData = (playerName, timePlayed) => {
  const data = {
    name: playerName,
    timePlayed: timePlayed,
  };
  return axios
    .post("http://localhost:3000/players", data)
    .then((response) => {
      console.log("Dữ liệu người chơi đã được lưu trữ thành công.");
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi khi lưu trữ dữ liệu người chơi:", error);
      throw error;
    });
};
