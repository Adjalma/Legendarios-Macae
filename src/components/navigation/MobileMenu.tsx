import { NavLink } from "react-router-dom";
import { NavigationLink } from "./types";

type MobileMenuProps = {
  links: NavigationLink[];
  isOpen: boolean;
  onClose: () => void;
};

const ctaLink = { label: "PRÉ CADASTRO LGND", path: "/cadastro" };

export const MobileMenu = ({ links, isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="border-t border-white/10 bg-legendarios-dark/95 md:hidden">
      <nav className="flex flex-col px-6 py-6 text-sm font-semibold uppercase tracking-wide text-white/80">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) =>
              `mb-3 rounded-md px-4 py-3 transition hover:bg-white/5 hover:text-white ${
                isActive ? "text-legendarios-orange" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <NavLink
            to={ctaLink.path}
            onClick={onClose}
            className="block rounded-md bg-legendarios-orange px-4 py-3 text-center font-semibold text-legendarios-dark transition hover:bg-white"
          >
            {ctaLink.label}
          </NavLink>
          <a
            href="https://loslegendarios.org/"
            target="_blank"
            rel="noreferrer"
            className="block rounded-md border border-legendarios-orange px-4 py-3 text-center text-legendarios-orange transition hover:bg-legendarios-orange hover:text-legendarios-dark"
            onClick={onClose}
          >
            Legendários Global
          </a>
        </div>
      </nav>
    </div>
  );
};

