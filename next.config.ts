import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  assetPrefix: isGitHubPages ? '/info90002-quiz1-practice' : undefined,
};

export default nextConfig;
