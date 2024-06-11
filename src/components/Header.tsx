import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex flex-1 items-center justify-start">
        <a href="/">
        <img src="/assets/logo.svg" alt="CoreAccess Logo" className="h-8 w-auto" />
      </a>
        </div>
        <nav className="hidden md:flex space-x-8 items-center justify-center flex-1">
          <Link href="/events" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Events
          </Link>
          <Link href="/docs" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Docs
          </Link>
        </nav>
        <div className="flex space-x-8 mr-5">
          <button className="btn">Connect Wallet</button>
          <button className="btn_white bg-white text-core-pink border-core-pink hover:bg-core-pink hover:text-white">Create Demo</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
