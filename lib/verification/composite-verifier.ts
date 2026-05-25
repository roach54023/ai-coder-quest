import { Verifier, VerificationInput, VerificationResult, createVerifier } from './index';

export class CompositeVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult> {
    const { checks = [] } = config;

    const results: VerificationResult[] = [];
    let hasManual = false;

    for (const checkType of checks) {
      const verifier = createVerifier(checkType);
      const result = await verifier.verify(input, config);

      if (result.passed === false) {
        return result;
      }

      if (result.passed === null) {
        hasManual = true;
      }

      results.push(result);
    }

    if (hasManual) {
      return {
        passed: null,
        method: 'manual',
        message: '自动检查已通过，截图已提交人工审核',
        details: { auto_checks_passed: results.filter((r) => r.passed === true).length },
      };
    }

    return {
      passed: true,
      method: 'auto',
      message: '所有验证项均通过！',
      details: { checks_passed: results.length },
    };
  }
}
