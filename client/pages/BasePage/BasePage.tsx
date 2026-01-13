import { Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useContext } from "react";
import { AuthContext, AuthSetContext } from "../../contexts/AuthContext";
// import { ClipLoader } from "react-spinners";

export default function BasePage() {
  const user = useContext(AuthContext);
  const setUser = useContext(AuthSetContext);
  const storedUsername = sessionStorage.getItem("username");
  if (!user && storedUsername) {
    setUser({ username: storedUsername });
  }
  return (
    <>
      <Header />
      <div id="body-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
