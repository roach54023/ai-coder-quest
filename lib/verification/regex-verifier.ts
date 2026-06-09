import { Verifier, VerificationInput, VerificationResult } from './index';

export class RegexVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, unknown>): Promise<VerificationResult> {
    const { text_content } = input;
    const pattern = typeof config.pattern === 'string' ? config.pattern : '';
    const locale = input.locale ?? 'en';

    if (!text_content) {
      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh' ? '请输入文本内容' : 'Enter the required text.',
      };
    }

    if (!pattern) {
      return {
        passed: false,
        method: 'auto',
        message: locale === 'zh' ? '验证配置错误，请联系管理员' : 'Verification is misconfigured. Contact support.',
      };
    }

    const regex = new RegExp(pattern);
    const trimmed = text_content.trim();

    if (regex.test(trimmed)) {
      return {
        passed: true,
        method: 'auto',
        message: locale === 'zh' ? '验证通过！格式正确。' : 'Verification passed. The format is correct.',
        details: { matched: trimmed },
      };
    }

    return {
      passed: false,
      method: 'auto',
      message: locale === 'zh' ? '格式不正确，请检查后重新提交' : 'The format is incorrect. Check it and submit again.',
      details: { input: trimmed, expected_pattern: pattern },
    };
  }
}
