import { Verifier, VerificationInput, VerificationResult } from './index';

export class UrlVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, unknown>): Promise<VerificationResult> {
    const { url_content } = input;
    const expect_status = typeof config.expect_status === 'number' ? config.expect_status : 200;
    const timeout = typeof config.timeout === 'number' ? config.timeout : 10000;
    const locale = input.locale ?? 'en';

    if (!url_content) {
      return { passed: false, method: 'auto', message: locale === 'zh' ? '请输入 URL' : 'Enter a URL.' };
    }

    try {
      new URL(url_content);
    } catch {
      return { passed: false, method: 'auto', message: locale === 'zh' ? 'URL 格式不正确' : 'The URL format is invalid.' };
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
          message: locale === 'zh' ? '网站可正常访问！' : 'The website is reachable.',
          details: { status: response.status, url: url_content },
        };
      }

      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh'
          ? `网站返回状态码 ${response.status}，期望 ${expect_status}`
          : `The website returned status ${response.status}; expected ${expect_status}.`,
        details: { status: response.status },
      };
    } catch (error: unknown) {
      const errorName = error instanceof Error ? error.name : '';
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorName === 'AbortError') {
        return { passed: false, method: 'auto', message: locale === 'zh' ? '请求超时，网站可能无法访问' : 'The request timed out. The website may be unreachable.' };
      }
      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh' ? `无法访问该 URL: ${errorMessage}` : `Could not reach this URL: ${errorMessage}`,
      };
    }
  }
}
