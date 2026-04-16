import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let { cartCount } = useContext(CartContext);
  let navigate = useNavigate();
  let location = useLocation();

  function handleLogout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#eeeeee] sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl h-18 mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center max-w-30 md:max-w-55 ">
          <img className="w-45" src={logo} alt="FreshCart Logo" />
        </Link>

        {userToken !== null && (
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <li>
              <Link
                className="hover:text-[#0aad0a] transition-colors duration-200"
                {...(location.pathname === "/"
                  ? {
                      className:
                        "text-white bg-[#0aad0a] w-20 h-9 flex items-center justify-center rounded-lg",
                    }
                  : {
                      className:
                        "text-gray-600 hover:bg-gray-100 w-20 h-9 flex items-center justify-center rounded-lg transition-colors duration-200",
                    })}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#0aad0a] transition-colors duration-200"
                {...(location.pathname === "/Products"
                  ? {
                      className:
                        "text-white bg-[#0aad0a] w-20 h-9 flex items-center justify-center rounded-lg",
                    }
                  : {
                      className:
                        "text-gray-600 hover:bg-gray-100 w-20 h-9 flex items-center justify-center rounded-lg transition-colors duration-200",
                    })}
                to="/Products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#0aad0a] transition-colors duration-200"
                {...(location.pathname === "/Categories"
                  ? {
                      className:
                        "text-white bg-[#0aad0a] w-20 h-9 flex items-center justify-center rounded-lg",
                    }
                  : {
                      className:
                        "text-gray-600 hover:bg-gray-100 w-20 h-9 flex items-center justify-center rounded-lg transition-colors duration-200",
                    })}
                to="/Categories"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#0aad0a] transition-colors duration-200"
                {...(location.pathname === "/Brands"
                  ? {
                      className:
                        "text-white bg-[#0aad0a] w-20 h-9 flex items-center justify-center rounded-lg",
                    }
                  : {
                      className:
                        "text-gray-600 hover:bg-gray-100 w-20 h-9 flex items-center justify-center rounded-lg transition-colors duration-200",
                    })}
                to="/Brands"
              >
                Brands
              </Link>
            </li>
          </ul>
        )}

        <div className="flex items-center gap-4">
          {userToken !== null ? (
            <>
              <Link
                to="/Cart"
                className="relative text-gray-600 hover:text-[#0aad0a] transition-colors"
              >
                <i className="fa-solid fa-cart-shopping  md:fa-lg"></i>{" "}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-[#0aad0a] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#0aad0a] transition-colors duration-200 font-medium cursor-pointer"
              >
                <i className="fa-solid fa-sign-out-alt mr-2"></i>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="w-20 md:w-20 text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-[#0aad0a] hover:text-[#0aad0a] transition-colors duration-200"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="w-22 md:w-22 text-sm font-medium bg-[#0aad0a] text-white px-4 py-2 rounded-lg hover:bg-[#0aad0a] transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {userToken !== null && (
        <div className="md:hidden border-t border-gray-100 px-4 py-2 flex gap-5 text-sm font-medium text-gray-600 overflow-x-auto">
          <Link className="hover:text-[#0aad0a] whitespace-nowrap" to="/">
            Home
          </Link>
          <Link
            className="hover:text-[#0aad0a] whitespace-nowrap"
            to="/Products"
          >
            Products
          </Link>
          <Link
            className="hover:text-[#0aad0a] whitespace-nowrap"
            to="/Categories"
          >
            Categories
          </Link>
          <Link className="hover:text-[#0aad0a] whitespace-nowrap" to="/Brands">
            Brands
          </Link>
        </div>
      )}
    </nav>
  );
}
