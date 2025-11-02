import Logo from "./Logo";

export const Nav = () => {
    return (
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Logo />
          </div>
          </nav>
    );
  }