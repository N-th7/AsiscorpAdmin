import { Logo } from "../atoms/Logo";
import { DesktopNavLinks } from "../molecules/DesktopNavLinks";
import { CTAButton } from "../molecules/CTAButton";
import { IconButton } from "../atoms/IconButton";

export function NavbarContent({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, onClick }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <Logo />
        <DesktopNavLinks />
        <div className="hidden lg:flex items-center gap-4">
          <CTAButton onClick={onClick} />
        </div>
        <IconButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      </div>
    </div>
  );
}
