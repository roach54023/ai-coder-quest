"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
      <rect width="512" height="512" rx="115" fill="#6C47FF" />
      <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/zh/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await signIn.email({ email, password, callbackURL: next });
    if (signInError) {
      setError("邮箱或密码错误，请重试。");
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  };

  const handleGitHubLogin = async () => {
    setOauthLoading(true);
    await signIn.social({ provider: "github", callbackURL: next });
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 border-r border-gray-100 flex-col justify-between p-12">
        <div className="flex items-center justify-between">
          <Link href="/zh" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="font-bold text-gray-900 text-base">VibeCamp</span>
          </Link>
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            English
          </Link>
        </div>

        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-medium">AI 编程教程</p>
          <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
            不背语法，
            <br />
            用 AI 做出真产品。
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            继续你的 AI 编程闯关课程，一关一关把项目做出来。
          </p>
        </div>

        <div className="space-y-3">
          {[
            { icon: "01", text: "安装 AI 编程助手" },
            { icon: "02", text: "做出并发布第一个网站" },
            { icon: "03", text: "加入全栈、AI 和支付功能" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-sm text-gray-500">
              <span className="w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black text-indigo-500">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-10 lg:hidden">
            <Link href="/zh" className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-gray-900">VibeCamp</span>
            </Link>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              English
            </Link>
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-1">欢迎回来</h1>
          <p className="text-sm text-gray-400 mb-8">登录后继续你的 AI 编程课程。</p>

          <button
            onClick={handleGitHubLogin}
            disabled={oauthLoading}
            className="w-full flex items-center justify-center gap-2.5 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-sm font-medium text-gray-700 transition-all disabled:opacity-50 mb-4"
          >
            {oauthLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            )}
            使用 GitHub 登录
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">或使用邮箱密码</span>
            </div>
          </div>

          <form onSubmit={handleCredentialsLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">邮箱</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">密码</label>
              <input
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {error && <div className="text-xs text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              登录
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            还没有账号？{" "}
            <Link href="/zh/register" className="text-gray-900 font-semibold hover:underline">
              免费注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
