/// <reference types="node" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves api/*.ts in development the same way Vercel does in production:
 * each file's default export gets a standard Request and returns a Response.
 */
const devApi = (): Plugin => ({
  name: 'dev-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const match = req.url?.match(/^\/api\/([\w-]+)/)
      if (!match) return next()
      try {
        const mod = await server.ssrLoadModule(`/api/${match[1]}.ts`)
        const chunks: Buffer[] = []
        for await (const c of req) chunks.push(c as Buffer)
        const request = new Request(`http://localhost${req.url}`, {
          method: req.method,
          headers: req.headers as Record<string, string>,
          body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
        })
        const response: Response = await mod.default(request)
        res.statusCode = response.status
        response.headers.forEach((v, k) => res.setHeader(k, v))
        if (response.body) {
          const reader = response.body.getReader()
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            res.write(value)
          }
        }
        res.end()
      } catch (err) {
        server.ssrFixStacktrace(err as Error)
        console.error(err)
        res.statusCode = 500
        res.end('dev api error')
      }
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Server-only secrets (no VITE_ prefix) from .env or src/.env. They are put on
  // process.env for the dev API and are never bundled into the client.
  const env = { ...loadEnv(mode, 'src', ''), ...loadEnv(mode, process.cwd(), '') }
  for (const k of ['BEDROCK_API_KEY', 'BEDROCK_REGION', 'BEDROCK_MODEL']) {
    if (env[k] && !process.env[k]) process.env[k] = env[k]
  }

  return {
    plugins: [react(), devApi()],
  }
})
