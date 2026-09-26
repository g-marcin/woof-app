import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input:
        process.env.API_SPEC ??
        'node_modules/@mgrzmil-org/api-types/openapi.json',
    output: 'src/api/generated',
    plugins: [
        {
            name: '@hey-api/client-axios',
            runtimeConfigPath: './src/api/clientConfig.ts',
        },
        '@tanstack/react-query',
    ],
})
