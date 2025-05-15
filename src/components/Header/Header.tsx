import { Link } from "react-router";
import homeIcon from "../../icons/home.svg";
import menuIcon from "../../icons/menu.svg";
import "./Header.css";
export default function Header() {
  return (
    <div id="header">
      <div>
        <Link to="/">
          <img className="home-icon" src={homeIcon}></img>
        </Link>
      </div>
      <div className="input-group">
        <label>
          <input type="text" className="form-control" />
        </label>
        <button type="submit" className="btn btn-outline-secondary">
          Search
        </button>
      </div>
      <div id="header-menu" className="input-group-prepend">
        <button
          type="button"
          className="dropdown-toogle"
          data-bs-toggle="dropdown"
        >
          <img className="menu-icon" src={menuIcon}></img>
        </button>
        <ul className="dropdown-menu">
          <li className="dropdown-item">Option</li>
        </ul>
      </div>
    </div>
  );
}
