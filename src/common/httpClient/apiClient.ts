import type { paths } from '@mgrzmil-org/api-types'
import { httpClient } from './httpClient'

// Typed wrapper over httpClient driven by the dog-api OpenAPI `paths`, so the
// URL, its path params and the response body are all checked against the
// spec instead of an unchecked `httpClient.get<T>(url)` cast. It stays on
// axios because the OpenTelemetry XMLHttpRequest instrumentation relies on it.

type GetPath = {
    [P in keyof paths]: paths[P] extends { get: object } ? P : never
}[keyof paths]

type GetOperation<P extends GetPath> = paths[P]['get']

type PathParams<P extends GetPath> =
    GetOperation<P> extends {
        parameters: { path: infer T }
    }
        ? T
        : never

type SuccessBody<P extends GetPath> =
    GetOperation<P> extends {
        responses: { 200: { content: { 'application/json': infer T } } }
    }
        ? T
        : never

type GetArgs<P extends GetPath> = [PathParams<P>] extends [never]
    ? []
    : [params: PathParams<P>]

const buildUrl = (path: string, params?: Record<string, string>) =>
    params
        ? path.replace(/\{(\w+)\}/g, (_, key: string) =>
              encodeURIComponent(params[key])
          )
        : path

export const apiGet = async <P extends GetPath>(
    path: P,
    ...[params]: GetArgs<P>
): Promise<SuccessBody<P>> => {
    const response = await httpClient.get<SuccessBody<P>>(
        buildUrl(path, params as Record<string, string> | undefined)
    )
    return response.data
}
