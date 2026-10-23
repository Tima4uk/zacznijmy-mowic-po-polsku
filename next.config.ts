import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'zacznijmy-mowic-po-polsku';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isGithubActions ? `/${repoName}` : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repoName}` : '',
  },
};

export default nextConfig;
