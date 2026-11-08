import React from "react";
import { Link } from "react-router";
import { Container, Logo } from "../index";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Home", to: "/" },
      { name: "All Posts", to: "/all-posts" },
      { name: "Add Post", to: "/add-post" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Login", to: "/login" },
      { name: "Signup", to: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", to: "#" },
      { name: "Privacy Policy", to: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              A place to write, read, and share ideas. Built with React, Redux
              and Appwrite.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-zinc-400 transition-colors hover:text-indigo-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} MegaBlog. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Made with React + Appwrite</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
