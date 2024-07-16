import { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import { logout } from "../../firebase";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { Popover } from "antd";

const bell_content = (
  <div>
    <p>Bạn chưa có thông báo nào</p>
  </div>
);
const search_content = (
  <div>
    <p>Không thể tra cứu lúc này </p>
  </div>
);

const Navbar = () => {
  const navRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>
            <Link to="/tvshows">TV Shows</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/newpopular">New & Popular</Link>
          </li>
          <li>
            <Link to="/mylist">My List</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Popover content={search_content} title="">
          <img src={search_icon} alt="" className="icon" />
        </Popover>
        <p>Intern</p>
        <Popover content={bell_content} title="">
          <img src={bell_icon} alt="" className="icon" />
        </Popover>

        <div className="navbar-profile">
          <FaSignOutAlt
            className="SignOut-icon"
            onClick={() => {
              logout();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
