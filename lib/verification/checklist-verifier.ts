import { Verifier, VerificationInput, VerificationResult } from './index';

/**
 * ChecklistVerifier - 操作清单验证
 * 用户完成操作清单后自动通关，不需要额外提交
 */
export class ChecklistVerifier implements Verifier {
  async verify(input: VerificationInput): Promise<VerificationResult> {
    // 操作清单类型的关卡通过 /api/progress/complete 直接通关
    // 如果走到这里说明是通过提交表单触发的，直接通过
    return {
      passed: true,
      method: 'auto',
      message: input.locale === 'zh' ? '操作清单已完成，通关成功！' : 'Checklist complete. Level passed.',
    };
  }
}
