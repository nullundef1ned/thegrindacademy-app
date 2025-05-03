import { PostHog } from "posthog-node"
import environmentUtil from "./env.util"

export default function PostHogClient() {
  const posthogClient = new PostHog(environmentUtil.POSTHOG_KEY!, {
    host: environmentUtil.POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  })

  return posthogClient
}
