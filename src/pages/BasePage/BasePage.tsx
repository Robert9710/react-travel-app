import { Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createContext } from "react";
// import applicationService from "../../application/application-service";

export default function BasePage() {
  // const AppContext = createContext({});
  return (
    // <AppContext.Provider value={applicationService}>
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
    // </AppContext.Provider>
  );
}
