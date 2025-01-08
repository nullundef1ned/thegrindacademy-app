const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;


const environmentUtil = { ENVIRONMENT, API_URL, WEBSITE_URL }

export default environmentUtil;