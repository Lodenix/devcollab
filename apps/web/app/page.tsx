"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Purely decorative — fake commands typed out in the side terminal.
// Has nothing to do with the real login request below.
const FAKE_COMMANDS: { cmd: string; out: string[] }[] = [
  { cmd: "git checkout dev", out: ["Already on 'dev'"] },
  { cmd: "git pull origin dev", out: ["Already up to date."] },
  { cmd: "npm run dev --workspace=apps/web", out: ["> next dev", "  ready on http://localhost:3000"] },
  { cmd: "curl -X POST /api/auth/login", out: ["> sending request...", "< 200 OK"] },
  { cmd: "echo $JWT_TOKEN", out: ["eyJhbGciOiJIUzI1NiIsInR5cCI6..."] },
  { cmd: "git status", out: ["On branch feature/login-form", "nothing to commit, working tree clean"] },
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cmdIndex = 0;

    function typeLine(text: string, isCommand: boolean) {
      return new Promise<void>((resolve) => {
        let i = 0;
        const prefix = isCommand ? "$ " : "  ";
        setLines((prev) => [...prev, prefix]);
        const interval = setInterval(() => {
          if (cancelled) {
            clearInterval(interval);
            return resolve();
          }
          i++;
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = prefix + text.slice(0, i);
            return next;
          });
          if (i >= text.length) {
            clearInterval(interval);
            setTimeout(resolve, isCommand ? 200 : 90);
          }
        }, isCommand ? 28 : 12);
      });
    }

    async function run() {
      while (!cancelled) {
        const { cmd, out } = FAKE_COMMANDS[cmdIndex % FAKE_COMMANDS.length];
        await typeLine(cmd, true);
        for (const line of out) {
          if (cancelled) return;
          await typeLine(line, false);
        }
        await new Promise((r) => setTimeout(r, 700));
        cmdIndex++;
        setLines((prev) => (prev.length > 40 ? prev.slice(prev.length - 40) : prev));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="w-full max-w-md h-72 sm:h-80 border border-neutral-800 bg-black flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-neutral-800">
        <span className="w-2 h-2 rounded-full border border-neutral-600" />
        <span className="w-2 h-2 rounded-full border border-neutral-600" />
        <span className="w-2 h-2 rounded-full border border-neutral-600" />
        <span className="ml-2 text-[11px] text-neutral-500">bash</span>
      </div>
      <div
        ref={boxRef}
        className="flex-1 px-3.5 py-3 text-[12.5px] leading-relaxed text-neutral-300 overflow-y-auto whitespace-pre-wrap break-all font-mono"
      >
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.6em]">
            {line}
          </div>
        ))}
        <span className="text-white animate-pulse">█</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("email and password are required");
      return;
    }

    setLoading(true);
    try {
      // TODO: confirm this against the real API contract BE posts on
      // issue #7 (POST /api/auth/login) — request/response shape below
      // is a placeholder until then.
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "invalid email or password");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "something went wrong, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-black text-white font-mono">
      <div className="flex-1 md:max-w-lg flex flex-col justify-center px-8 sm:px-16 py-16 border-b md:border-b-0 md:border-r border-neutral-800">
        <div className="text-[13px] text-neutral-500 mb-10">
          ~/devcollab<span className="animate-pulse">_</span>
        </div>

        <h1 className="text-4xl font-bold lowercase tracking-tight">login</h1>
        <p className="text-neutral-500 text-sm mt-2 mb-10">{"// authenticate to continue"}</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col">
          <label htmlFor="email" className="text-[11px] text-neutral-400 lowercase mb-1.5">
            email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-neutral-700 focus:border-white outline-none text-sm px-3.5 py-2.5 placeholder-neutral-600 transition-colors"
          />

          <label htmlFor="password" className="text-[11px] text-neutral-400 lowercase mb-1.5 mt-4">
            password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border border-neutral-700 focus:border-white outline-none text-sm px-3.5 py-2.5 placeholder-neutral-600 transition-colors"
          />

          {error && (
            <div className="mt-4 text-[13px] bg-neutral-900 border border-neutral-600 border-l-2 border-l-white px-3 py-2.5">
              error: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 bg-white text-black border border-white text-sm font-bold lowercase px-3.5 py-2.5 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          >
            {loading ? "authenticating..." : "> run login"}
          </button>
        </form>

        <p className="mt-8 text-[13px] text-neutral-500">
          no account?{" "}
          <a href="/register" className="text-white underline">
            register
          </a>
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-neutral-950">
        <Terminal />
      </div>
    </div>
  );
}
