import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web'

const dogApiUrl = import.meta.env.VITE_DOG_API_URL
// propagateTraceHeaderCorsUrls does an exact string match against the full
// request URL, not a prefix match, so the bare origin must become a pattern
// that matches every path under it.
const dogApiUrlPattern = new RegExp(`^${dogApiUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)

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
