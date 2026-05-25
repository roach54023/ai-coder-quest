import { Verifier, VerificationInput, VerificationResult } from './index';

export class GitHubVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult> {
    const url = input.url_content || input.text_content;

    if (!url) {
      return { passed: false, method: 'auto', message: '请输入 GitHub 仓库地址' };
    }

    const githubPattern = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;
    const match = url.match(githubPattern);

    if (!match) {
      return {
        passed: false,
        method: 'auto',
        message: '格式不正确，应为 https://github.com/用户名/仓库名',
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
        const data = await response.json();
        return {
          passed: true,
          method: 'auto',
          message: `仓库存在！(${data.full_name})`,
          details: { owner, repo, stars: data.stargazers_count },
        };
      }

      if (response.status === 404) {
        return {
          passed: false,
          method: 'auto',
          message: '仓库不存在或为私有仓库，请确认地址正确且为公开仓库',
        };
      }

      return { passed: false, method: 'auto', message: `GitHub API 返回错误 (${response.status})` };
    } catch (error: any) {
      return { passed: false, method: 'auto', message: `无法连接 GitHub: ${error.message}` };
    }
  }
}
