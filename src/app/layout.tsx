import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		default: "Souvlaki42",
		template: "%s | Souvlaki42",
	},
	description: "My corner of the internet.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} tracking-tight antialiased`}
				>
					{children}
					<Footer />
				</body>
			</html>
		</ViewTransitions>
	);
}

function Footer() {
	const links = [
		{ name: "@Souvlaki42", url: "https://x.com/souvlaki42" },
		{ name: "Github", url: "https://github.com/souvlaki42" },
		{ name: "Email", url: "mailto:souvlaki42@gmail.com" },
	];

	return (
		<footer className="mt-12 text-center">
			<div className="flex justify-center space-x-4 tracking-tight">
				{links.map((link) => (
					<a
						key={link.name}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 transition-colors duration-200 hover:text-blue-500"
					>
						{link.name}
					</a>
				))}
			</div>
		</footer>
	);
}
