import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavigationLink } from "./types";
import { MobileMenu } from "./MobileMenu";

const links: NavigationLink[] = [
  { label: "Início", path: "/" },
  { label: "TOPs", path: "/tops" },
  { label: "Histórias", path: "/historias" },
  { label: "Mídia", path: "/midia" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="bg-legendarios-dark/90 backdrop-blur supports-[backdrop-filter]:bg-legendarios-dark/70 sticky top-0 z-50 border-b border-white/5">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6">
        <NavLink to="/" className="flex items-center gap-4">
          <img
            src="/assets/logo-legendarios-macae-flag.svg"
            alt="Legendários Macaé"
            className="h-14 w-14 rounded-full border border-white/10 bg-black/60 p-1"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-[0.4em] uppercase text-legendarios-orange">
              Legendários
            </span>
            <span className="text-sm text-white/80 uppercase tracking-[0.3em]">Macaé</span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wide text-white/80 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition hover:text-white ${
                  isActive ? "text-legendarios-orange" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://loslegendarios.org/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-legendarios-orange px-4 py-2 text-legendarios-orange transition hover:bg-legendarios-orange hover:text-legendarios-dark"
          >
            Legendários Global
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          onClick={toggleMenu}
        >
          <span className="sr-only">Abrir menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <MobileMenu links={links} isOpen={isOpen} onClose={toggleMenu} />
    </header>
  );
};

