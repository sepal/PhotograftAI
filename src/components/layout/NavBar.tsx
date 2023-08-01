import Logo from "@/components/icons/Logo";

const NavBar = () => (
  <nav className="flex items-center justify-center flex-wrap bg-indigo-500 px-2 text-white font-semibold">
    <Logo />
    <div className="mx-2">PhotoGraft.AI</div>
  </nav>
);

export default NavBar;
