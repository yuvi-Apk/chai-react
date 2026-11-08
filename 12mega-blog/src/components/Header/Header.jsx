import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { Container, Logo, LogoutBtn } from "../index";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus, primary: true },
  ].filter((item) => item.active);

  const linkClass = ({ isActive }, primary) =>
    primary
      ? "px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
      : `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-zinc-800 text-white"
            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
        }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={item.slug}
                  end={item.slug === "/"}
                  className={(state) => linkClass(state, item.primary)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile menu toggle */}
          <button
            className="rounded-lg p-2 text-zinc-300 hover:bg-zinc-800 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile nav */}
        {menuOpen && (
          <ul className="flex flex-col gap-1 pb-4 md:hidden">
            {navItems.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={item.slug}
                  end={item.slug === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={(state) =>
                    `block ${linkClass(state, item.primary)}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {authStatus && (
              <li>
                <LogoutBtn className="w-full text-left" />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
};

export default Header;
