import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Trang chủ",
	description: "Forest In The Sky - Flamingo Đại Lải",
	alternates: {
		canonical: "https://batdongsan01.themeweb4s.com/",
	},
	openGraph: {
		type: "website",
		locale: "vi_VN",
		title: "Trang chủ",
		url: "https://batdongsan01.themeweb4s.com/",
		description: "Forest In The Sky - Flamingo Đại Lải",
		siteName: "Forest In The Sky",
	},
	twitter: {
		card: "summary",
		title: "Trang chủ",
	},
	icons: {
		icon: "https://batdongsan01.themeweb4s.com/favicon.ico",
	},
};

const remoteCssBase = "https://batdongsan01.themeweb4s.com";
const remoteStylesheets = [
	"/templates/fashion03/assets/css/bootstrap.css",
	"/templates/fashion03/assets/css/swiper.css",
	"/templates/fashion03/assets/lib/fontawesome/css/fontawesome.css",
	"/templates/fashion03/assets/lib/fontawesome/css/light.css",
	"/templates/fashion03/assets/lib/fontawesome/css/solid.css",
	"/templates/fashion03/assets/lib/fontawesome/css/brands.css",
	"/templates/fashion03/assets/css/lightgallery.css",
	"/templates/fashion03/assets/css/variable.css",
	"/templates/fashion03/assets/css/compare.css",
	"/templates/fashion03/assets/css/page.css",
	"/templates/fashion03/assets/css/utilities.css",
	"/templates/fashion03/assets/css/custom.css",
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link
					rel="dns-prefetch"
					href="https://cdn1394.cdn-template-4s.com"
				/>
				{remoteStylesheets.map((href) => (
					<link
						key={href}
						rel="stylesheet"
						href={`${remoteCssBase}${href}`}
					/>
				))}
				<style>{`@font-face{font-family:'Font Awesome 6 Pro';font-style:normal;font-weight:300;font-display:block;src:url("https://batdongsan01.themeweb4s.com/templates/fashion03/assets/fonts/fa-light-300.woff2") format("woff2"),url("https://batdongsan01.themeweb4s.com/templates/fashion03/assets/fonts/fa-light-300.ttf") format("truetype");font-display:swap;}@font-face{font-family:'Font Awesome 6 Pro';font-style:normal;font-weight:900;font-display:block;src:url("https://batdongsan01.themeweb4s.com/templates/fashion03/assets/fonts/fa-solid-900.woff2") format("woff2"),url("https://batdongsan01.themeweb4s.com/templates/fashion03/assets/fonts/fa-solid-900.ttf") format("truetype");font-display:swap;}@font-face{font-family:'Font Awesome 6 Brands';font-style:normal;font-weight:400;font-display:block;src:url("https://batdongsan01.themeweb4s.com/templates/fashion03/assets/fonts/fa-brands-400.woff2") format("woff2"),url("https://batdongsan01.themeweb4s.com/templates/fashion03/assets/fonts/fonts/fa-brands-400.ttf") format("truetype");font-display:swap;}`}</style>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
