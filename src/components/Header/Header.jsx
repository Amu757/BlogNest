import {LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./header.css"

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Contact",
      slug: "/contact",
      active: !authStatus,
    },
    {
      name: "Contact",
      slug: "/contact",
      active: authStatus,
    },
  ];

  return (
    <header className="header-container">
        <nav className="navigation">
          <div className="leftpart">
            <Link to="/" className="logolink">
              <img src="/Blog Logo.png" className="logo" />
            </Link>
          </div>

          <ul className="rightpart">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="navButton"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
    </header>
  );
}

export default Header;
