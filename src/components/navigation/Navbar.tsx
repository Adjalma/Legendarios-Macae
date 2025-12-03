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

const ctaLink = { label: "PRÉ CADASTRO LGND", path: "/cadastro" };

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="bg-legendarios-dark/90 backdrop-blur supports-[backdrop-filter]:bg-legendarios-dark/70 sticky top-0 z-50 border-b border-white/5">
      <div className="mx-auto flex h-20 w-full max-w-[95vw] lg:max-w-7xl xl:max-w-[1400px] items-center justify-between gap-4 md:gap-6 px-4 md:px-6 lg:px-8 xl:px-12">
        <NavLink to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <img
            src="/assets/logo-legendarios-macae-flag.svg"
            alt="Legendários Macaé"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/10 bg-black/60 p-1 flex-shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xs md:text-sm lg:text-base tracking-[0.15em] md:tracking-[0.2em] uppercase text-legendarios-orange whitespace-nowrap">
              Legendários
            </span>
            <span className="text-[9px] md:text-[10px] lg:text-xs text-white/80 uppercase tracking-[0.1em] md:tracking-[0.15em] whitespace-nowrap">Macaé</span>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-3 md:gap-4 lg:gap-5 text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wide text-white/80 md:flex flex-shrink-0">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-1 md:px-2 py-1 whitespace-nowrap transition hover:text-white ${
                  isActive ? "text-legendarios-orange" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="ml-2 md:ml-4 lg:ml-6 flex items-center gap-2 md:gap-3 flex-shrink-0">
            <NavLink
              to={ctaLink.path}
              className="whitespace-nowrap rounded-full bg-legendarios-orange px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 text-[9px] md:text-[10px] lg:text-xs text-legendarios-dark font-semibold transition hover:bg-white"
            >
              {ctaLink.label}
            </NavLink>
            <a
              href="https://loslegendarios.org/"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap rounded-full border border-legendarios-orange px-2 py-1 md:px-2.5 md:py-1.5 lg:px-3 lg:py-2 text-[9px] md:text-[10px] lg:text-xs text-legendarios-orange transition hover:bg-legendarios-orange hover:text-legendarios-dark"
            >
              Legendários Global
            </a>
          </div>
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

