import { Verifier, VerificationInput, VerificationResult, createVerifier } from './index';

export class CompositeVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult> {
    const { checks = [] } = config;

    const results: VerificationResult[] = [];

    for (const check of checks) {
      // checks 可以是字符串数组 ["url_check", "github_url"]
      // 或对象数组 [{"type": "url_check", ...}]
      const checkType = typeof check === 'string' ? check : check.type;
      const checkConfig = typeof check === 'string' ? config : { ...config, ...check };

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
      message: '所有验证项均通过！',
      details: { checks_passed: results.length },
    };
  }
}
