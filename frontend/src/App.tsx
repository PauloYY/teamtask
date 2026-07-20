import AppRoutes from "./routes/AppRoutes";
import "./styles/variables.css";
import "./styles/global.css";
import ThemeProvider from "./context/ThemeContext.tsx";

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}