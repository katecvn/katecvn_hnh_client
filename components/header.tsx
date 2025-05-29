"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    // { name: "Dịch vụ", href: "/services" },
    { name: "Tin tức", href: "/news" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-tech-blue-200"
          : "bg-blue-900/80 backdrop-blur-sm border-b border-gray-700/50"
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-tech-blue-600 to-cyber-blue rounded-lg flex items-center justify-center animate-tech-pulse">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span
              className={cn(
                "text-xl font-bold transition-colors",
                isScrolled ? "text-tech-blue-900" : "text-white"
              )}
            >
              Katec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-tech-blue-400",
                  isScrolled ? "text-tech-blue-700" : "text-white/90"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              size="sm"
              asChild
              className={cn(
                "transition-all duration-300",
                isScrolled
                  ? "border-tech-blue-500 text-tech-blue-600 hover:bg-tech-blue-500 hover:text-white"
                  : "bg-tech-blue-500 text-white hover:bg-tech-blue-600"
              )}
            >
              <Link href="/contact">Tư vấn miễn phí</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={cn(isScrolled ? "text-tech-blue-900" : "text-white")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-tech-blue-700 hover:text-tech-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-tech-blue-200">
                  <Button
                    className="w-full bg-tech-blue-500 hover:bg-tech-blue-600"
                    asChild
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Tư vấn miễn phí
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
