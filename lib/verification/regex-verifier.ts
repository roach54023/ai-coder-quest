import { Verifier, VerificationInput, VerificationResult } from './index';

export class RegexVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult> {
    const { text_content } = input;
    const { pattern } = config;

    if (!text_content) {
      return {
        passed: false,
        method: 'auto',
        message: '请输入文本内容',
      };
    }

    if (!pattern) {
      return {
        passed: false,
        method: 'auto',
        message: '验证配置错误，请联系管理员',
      };
    }

    const regex = new RegExp(pattern);
    const trimmed = text_content.trim();

    if (regex.test(trimmed)) {
      return {
        passed: true,
        method: 'auto',
        message: '验证通过！格式正确。',
        details: { matched: trimmed },
      };
    }

    return {
      passed: false,
      method: 'auto',
      message: '格式不正确，请检查后重新提交',
      details: { input: trimmed, expected_pattern: pattern },
    };
  }
}
