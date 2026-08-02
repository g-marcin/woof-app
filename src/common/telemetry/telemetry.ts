import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web'

const dogApiUrl = import.meta.env.VITE_DOG_API_URL
// propagateTraceHeaderCorsUrls does an exact string match against the full
// request URL, not a prefix match, so the bare origin must become a pattern
// that matches every path under it.
const dogApiUrlPattern = new RegExp(`^${dogApiUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)

// dog-api's /telemetry/traces relay parses the body as OTLP protobuf and
// forwards it as-is to Tempo's gRPC endpoint, so this must stay the
// -otlp-proto exporter, not -otlp-http (which serializes to JSON by
// default in the browser and gets rejected as unparseable protobuf).
const exporter = new OTLPTraceExporter({
    url: `${dogApiUrl}/telemetry/traces`,
})

const provider = new WebTracerProvider({
    resource: resourceFromAttributes({
        'service.name': 'woof-app',
    }),
    spanProcessors: [new BatchSpanProcessor(exporter)],
})

provider.register()

registerInstrumentations({
    instrumentations: [
        new XMLHttpRequestInstrumentation({
            propagateTraceHeaderCorsUrls: [dogApiUrlPattern],
        }),
    ],
})
