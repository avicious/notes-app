const Navbar = () => {
  return (
    <nav className="bg-ghost flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-carbon py-2">Notes</h2>

      <ProfileInfo />
    </nav>
  );
};

export default Navbar;
