import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import App from "./App";

const theme = createTheme({
  primaryColor: "red",
  colors: {
    red: [
      "#fff1f2",
      "#ffe4e6",
      "#fecdd3",
      "#fda4af",
      "#fb7185",
      "#f43f5e",
      "#e11d48",
      "#be123c",
      "#9f1239",
      "#881337",
    ],
  },
  fontFamily: "Inter, -apple-system, sans-serif",
  defaultRadius: "sm",
});

// Catch-all route — App handles its own nav logic internally
const router = createMemoryRouter([{ path: "*", element: <App /> }]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} defaultColorScheme="light">
    <RouterProvider router={router} />
  </MantineProvider>,
);
