import { RegexVerifier } from './regex-verifier';
import { UrlVerifier } from './url-verifier';
import { GitHubVerifier } from './github-verifier';
import { CompositeVerifier } from './composite-verifier';
import { ChecklistVerifier } from './checklist-verifier';

export interface VerificationInput {
  text_content?: string;
  url_content?: string;
}

export interface VerificationResult {
  passed: boolean | null;
  method: 'auto' | 'manual';
  message: string;
  details?: Record<string, any>;
}

export interface Verifier {
  verify(input: VerificationInput, config: Record<string, any>): Promise<VerificationResult>;
}

export function createVerifier(type: string): Verifier {
  switch (type) {
    case 'regex':
      return new RegexVerifier();
    case 'url_check':
      return new UrlVerifier();
    case 'github_url':
      return new GitHubVerifier();
    case 'composite':
      return new CompositeVerifier();
    case 'checklist':
      return new ChecklistVerifier();
    default:
      return new ChecklistVerifier();
  }
}
