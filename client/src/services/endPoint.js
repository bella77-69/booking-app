const DOMAIN = import.meta.env.VITE_ENDPOINT
  ? import.meta.env.VITE_ENDPOINT
  : "http://localhost:8000";

export default DOMAIN;