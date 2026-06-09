import { Verifier, VerificationInput, VerificationResult, createVerifier } from './index';

export class CompositeVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, unknown>): Promise<VerificationResult> {
    const checks = Array.isArray(config.checks) ? config.checks : [];

    const results: VerificationResult[] = [];

    for (const check of checks) {
      // checks 可以是字符串数组 ["url_check", "github_url"]
      // 或对象数组 [{"type": "url_check", ...}]
      const checkRecord = typeof check === 'object' && check !== null ? check as Record<string, unknown> : {};
      const checkType = typeof check === 'string' ? check : String(checkRecord.type ?? '');
      const checkConfig = typeof check === 'string' ? config : { ...config, ...checkRecord };

      const verifier = createVerifier(checkType);
      const result = await verifier.verify(input, checkConfig);

      if (result.passed === false) {
        return result;
      }

      results.push(result);
    }

    return {
      passed: true,
      method: 'auto',
      message: input.locale === 'zh' ? '所有验证项均通过！' : 'All verification checks passed.',
      details: { checks_passed: results.length },
    };
  }
}
