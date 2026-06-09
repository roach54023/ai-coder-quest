import { Verifier, VerificationInput, VerificationResult } from './index';

export class GitHubVerifier implements Verifier {
  async verify(input: VerificationInput): Promise<VerificationResult> {
    const url = input.url_content || input.text_content;
    const locale = input.locale ?? 'en';

    if (!url) {
      return { passed: false, method: 'auto', message: locale === 'zh' ? '请输入 GitHub 仓库地址' : 'Enter a GitHub repository URL.' };
    }

    const githubPattern = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;
    const match = url.match(githubPattern);

    if (!match) {
      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh'
          ? '格式不正确，应为 https://github.com/用户名/仓库名'
          : 'Invalid format. Use https://github.com/username/repository.',
      };
    }

    const [, owner, repo] = match;

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Coder-Quest',
        },
      });

      if (response.status === 200) {
        const data = await response.json() as { full_name?: string; stargazers_count?: number };
        return {
          passed: true,
          method: 'auto',
          message: locale === 'zh' ? `仓库存在！(${data.full_name})` : `Repository found: ${data.full_name}.`,
          details: { owner, repo, stars: data.stargazers_count },
        };
      }

      if (response.status === 404) {
        return {
          passed: false,
          method: 'auto',
          message: locale === 'zh'
            ? '仓库不存在或为私有仓库，请确认地址正确且为公开仓库'
            : 'Repository not found or private. Check that the URL is correct and the repository is public.',
        };
      }

      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh' ? `GitHub API 返回错误 (${response.status})` : `GitHub API returned an error (${response.status}).`,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh' ? `无法连接 GitHub: ${errorMessage}` : `Could not connect to GitHub: ${errorMessage}`,
      };
    }
  }
}
