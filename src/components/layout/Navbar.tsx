import {
  BarChart3,
  Bell,
  BookMarked,
  BookOpen,
  Clock,
  Home,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/books", label: "All Books", icon: BookOpen },
    { path: "/borrow-summary", label: "Borrow Summary", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm px-1">
      <div className="container mx-auto px-3 md:px-0 ">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Simple book icon */}
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-bold text-black">LibraryHub</span>
                <span className="text-xs text-gray-500">Digital Library</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Simple links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-black border-b-2 border-black"
                      : "text-gray-600 hover:text-black hover:border-b-2 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for books, authors, or genres..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                Search
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Books
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <BookMarked className="h-4 w-4 mr-2" />
                  My Reading List
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Reading History
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
