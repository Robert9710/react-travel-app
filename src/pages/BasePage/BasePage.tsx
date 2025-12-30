import { Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import { ClipLoader } from "react-spinners";

export default function BasePage() {
  return (
    <>
      <Header />
      <div id="body-container">
        {/* {isPending && (
          <div id="loader">
            <p>Loading...Please wait, it may take up to 1 minute</p>
            <ClipLoader />
          </div>
        )} */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
