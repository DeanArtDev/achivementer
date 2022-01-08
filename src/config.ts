const config = {
  appBackendUrl: `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}` || "/api",
};

export default config;
