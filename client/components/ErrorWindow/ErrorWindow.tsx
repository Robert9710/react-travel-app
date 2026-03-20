import { Link } from "react-router";
import "./ErrorWindow.css";

export default function ErrorWindow() {
  return (
    <div id="error-window" className="m-auto">
      <p>An error was encountered in the page you accessed.</p>
      <p>
        Click{" "}
        <Link to="/" className="home-page-link">
          here
        </Link>{" "}
        to go to the Home page.
      </p>
    </div>
  );
}
