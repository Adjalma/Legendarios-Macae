import { NavLink } from "react-router-dom";
import { NavigationLink } from "./types";

type MobileMenuProps = {
  links: NavigationLink[];
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu = ({ links, isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="border-t border-white/10 bg-legendarios-dark/95 md:hidden">
      <nav className="flex flex-col px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white/80">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-white ${
                isActive ? "text-legendarios-orange" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <a
          href="https://legendarios.org.br/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 rounded-md border border-legendarios-orange px-3 py-2 text-center text-legendarios-orange transition hover:bg-legendarios-orange hover:text-legendarios-dark"
          onClick={onClose}
        >
          Legendários Global
        </a>
      </nav>
    </div>
  );
};

