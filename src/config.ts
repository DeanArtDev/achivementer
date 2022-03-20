const config = {
  appBackendUrl: `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api` || "/api",
};

export default config;
