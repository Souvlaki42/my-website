import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		mdxRs: true,
	},
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
