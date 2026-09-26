import type { paths } from '@mgrzmil-org/api-types'
import { httpClient } from './httpClient'

type GetPath = {
    [P in keyof paths]: paths[P] extends { get: object } ? P : never
}[keyof paths]

type GetOperation<P extends GetPath> = paths[P]['get']

type OperationParams<P extends GetPath> =
    GetOperation<P> extends { parameters: infer T } ? T : never

type PathOption<P extends GetPath> =
    OperationParams<P> extends { path: infer T }
        ? { path: T }
        : { path?: never }

type QueryOption<P extends GetPath> =
    OperationParams<P> extends { query: infer T }
        ? { query: T }
        : OperationParams<P> extends { query?: infer T }
          ? [Exclude<T, undefined>] extends [never]
              ? { query?: never }
              : { query?: Exclude<T, undefined> }
          : { query?: never }

type GetOptions<P extends GetPath> = PathOption<P> &
    QueryOption<P> & { signal?: AbortSignal }

type GetArgs<P extends GetPath> =
    object extends GetOptions<P>
        ? [options?: GetOptions<P>]
        : [options: GetOptions<P>]

type SuccessBody<P extends GetPath> =
    GetOperation<P> extends {
        responses: { 200: { content: { 'application/json': infer T } } }
    }
        ? T
        : unknown

type Message<P extends GetPath> =
    SuccessBody<P> extends { message: infer M } ? M : unknown

type IsUnion<T, U = T> = T extends unknown
    ? [U] extends [T]
        ? false
        : true
    : never

type SinglePath<P extends GetPath> = true extends IsUnion<P> ? never : P

const encodeSegment = (key: string, value: unknown) => {
    if (typeof value !== 'string' || value === '') {
        throw new Error(`Missing path param "${key}"`)
    }
    if (value === '.' || value === '..') {
        throw new Error(`Invalid path param "${key}": "${value}"`)
    }
    return encodeURIComponent(value)
}

const buildUrl = (path: string, params: Record<string, unknown> = {}) =>
    path.replace(/\{(\w+)\}/g, (_, key: string) =>
        encodeSegment(key, params[key])
    )

export const apiGet = async <P extends GetPath>(
    path: SinglePath<P>,
    ...[options]: GetArgs<P>
): Promise<SuccessBody<P>> => {
    const {
        path: pathParams,
        query,
        signal,
    } = (options ?? {}) as {
        path?: Record<string, unknown>
        query?: Record<string, unknown>
        signal?: AbortSignal
    }
    const response = await httpClient.get<SuccessBody<P>>(
        buildUrl(path, pathParams),
        { params: query, signal }
    )
    return response.data
}

export const apiGetMessage = async <P extends GetPath>(
    path: SinglePath<P>,
    ...args: GetArgs<P>
): Promise<Message<P>> => {
    const data = (await apiGet<P>(path, ...args)) as {
        status?: unknown
        message?: unknown
    }
    if (data?.status !== 'success') {
        throw new Error(`Request to ${path} failed: ${String(data?.status)}`)
    }
    return data.message as Message<P>
}
