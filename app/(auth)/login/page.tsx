"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser({ username, password });
      login(response.token, response.username);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Lado esquerdo — visível só em md+ */}
      <div className="hidden md:flex md:flex-1 relative items-end p-12 bg-gradient-to-br from-[#0f2d1a] via-[#1a4731] to-[#2d7a4f] overflow-hidden">
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80')" }}
        />
        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#5eba85]" />
            <span className="text-xs font-semibold tracking-widest text-[#a7f3c8]">BEM-VINDO À</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-8">
            Plataforma <span className="text-[#5eba85]">EcoFeira</span>
          </h1>
          <blockquote className="bg-white/10 border border-white/15 rounded-xl px-6 py-5 text-[#d1fae5] italic text-sm leading-relaxed">
            "Fortalecendo os processos de comercialização e geração de renda a partir de produtos agroecológicos."
          </blockquote>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className="flex-1 md:w-[520px] md:flex-none bg-[#f0faf4] flex items-center justify-center px-6 py-12 md:px-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#1a4731] flex items-center justify-center mb-3">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1a4731]">EcoFeira</h2>
            <p className="text-sm text-gray-500 mt-1">Acesse sua conta para continuar</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Usuário */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1a4731]">Usuário</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10 transition"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#1a4731]">Senha</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Esqueci senha */}
            <div className="flex justify-end -mt-2">
              <a href="#" className="text-xs font-medium text-[#2d7a4f] hover:underline">
                Esqueci minha senha
              </a>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 text-red-700 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#1a4731] hover:bg-[#153d28] active:bg-[#0f2d1a] text-white font-semibold text-sm tracking-wide transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar →"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2026 EcoFeira · Associação Agroecológica · Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}