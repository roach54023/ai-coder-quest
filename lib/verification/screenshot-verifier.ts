import { Verifier, VerificationInput, VerificationResult } from './index';

export class ScreenshotVerifier implements Verifier {
  async verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult> {
    const { screenshot_urls } = input;

    if (!screenshot_urls || screenshot_urls.length === 0) {
      return { passed: false, method: 'auto', message: '请上传截图' };
    }

    return {
      passed: null,
      method: 'manual',
      message: '截图已提交，等待审核（通常 24 小时内完成）',
      details: { screenshot_count: screenshot_urls.length },
    };
  }
}
