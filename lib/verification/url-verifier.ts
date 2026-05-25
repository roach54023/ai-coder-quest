import { Verifier, VerificationInput, VerificationResult } from './index';

export class UrlVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult> {
    const { url_content } = input;
    const { expect_status = 200, timeout = 10000 } = config;

    if (!url_content) {
      return { passed: false, method: 'auto', message: '请输入 URL' };
    }

    try {
      new URL(url_content);
    } catch {
      return { passed: false, method: 'auto', message: 'URL 格式不正确' };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url_content, {
        method: 'HEAD',
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      if (response.status === expect_status) {
        return {
          passed: true,
          method: 'auto',
          message: '网站可正常访问！',
          details: { status: response.status, url: url_content },
        };
      }

      return {
        passed: false,
        method: 'auto',
        message: `网站返回状态码 ${response.status}，期望 ${expect_status}`,
        details: { status: response.status },
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { passed: false, method: 'auto', message: '请求超时，网站可能无法访问' };
      }
      return { passed: false, method: 'auto', message: `无法访问该 URL: ${error.message}` };
    }
  }
}
