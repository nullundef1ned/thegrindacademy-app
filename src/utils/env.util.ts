const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;


const environmentUtil = { ENVIRONMENT, API_URL, WEBSITE_URL, POSTHOG_KEY, POSTHOG_HOST }

export default environmentUtil;