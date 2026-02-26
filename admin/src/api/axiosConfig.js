let base_url;

if (process.env.NODE_ENV === "production") {
  base_url = "https://.com/api/v1";
} else {
  base_url = "http://localhost:7113/api/v1";
}

export { base_url };

const getTokenFromLocalStorage = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
