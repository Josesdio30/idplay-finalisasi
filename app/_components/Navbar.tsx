'use client';

import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menuItems = [
	{ label: "Home", href: "/" },
	{ label: "Kategori", href: "/kategori" },
	{ label: "Berita & Informasi", href: "#" },
	{ label: "Regional", href: "#" },
	{ label: "Dukungan", href: "#" },
	{ label: "Profile", href: "#" },
];

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<>
			<nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-sm shadow-md py-3 px-4 md:px-8 flex justify-between items-center z-50">
				<div className="flex items-center">
					<Image
						src="/imgs/logo-idplay.png"
						alt="IdPlay Logo"
						width={120}
						height={40}
						priority
						className="w-[100px] md:w-[120px] h-auto"
					/>
				</div>

				<div className="hidden md:flex space-x-4 lg:space-x-8 text-white text-sm font-medium drop-shadow-md">
					{menuItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<a
								key={item.label}
								href={item.href}
								className={clsx(
									"relative transition-colors flex items-center gap-2",
									!isActive && "hover:text-orange-500"
								)}
							>
								{isActive ? (
									<span className="px-3 py-1 rounded-full bg-orange-500 text-white font-semibold">
										{item.label}
									</span>
								) : (
									item.label
								)}
							</a>
						);
					})}
				</div>
				<div className="hidden md:flex items-center space-x-2">
					<select className="border-none outline-none bg-transparent text-white text-sm drop-shadow-md">
						<option>ID</option>
						<option>EN</option>
					</select>
				</div>
				<div className="md:hidden flex items-center">
					<button
						onClick={toggleMenu}
						className="relative w-6 h-6 text-white focus:outline-none"
					>
						<FaBars
							size={24}
							className={`absolute top-0 left-0 transition-all duration-300 transform ${
								isMenuOpen
									? "opacity-0 scale-75 rotate-45"
									: "opacity-100 scale-100 rotate-0"
							}`}
						/>
						<FaTimes
							size={24}
							className={`absolute top-0 left-0 transition-all duration-300 transform ${
								isMenuOpen
									? "opacity-100 scale-100 rotate-0"
									: "opacity-0 scale-75 -rotate-45"
							}`}
						/>
					</button>
				</div>
			</nav>

			<div
				className={clsx(
					"md:hidden fixed top-[60px] left-0 w-full bg-black/90 backdrop-blur-sm z-40 transform transition-all duration-300 origin-top",
					isMenuOpen
						? "scale-y-100 opacity-100 max-h-screen"
						: "scale-y-0 opacity-0 max-h-0 overflow-hidden"
				)}
			>
				<div className="flex flex-col items-center space-y-4 py-4 text-white text-sm font-medium drop-shadow-md">
					{menuItems.map((item) => (
						<a
							key={item.label}
							href={item.href}
							className={clsx(
								"transition-colors",
								pathname === item.href
									? "text-orange-500"
									: "hover:text-orange-500"
							)}
							onClick={toggleMenu}
						>
							{item.label}
						</a>
					))}
					<div className="flex items-center space-x-2">
						<select
							className="border-none outline-none bg-transparent text-white text-sm drop-shadow-md"
							onChange={toggleMenu}
						>
							<option>ID</option>
							<option>EN</option>
						</select>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
