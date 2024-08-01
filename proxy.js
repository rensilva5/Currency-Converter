import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Proxy server is running");
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://www.frankfurter.app",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove /api prefix
    },
  })
);

app.listen(5000, () => {
  console.log("Proxy server is running on http://localhost:5000");
});
