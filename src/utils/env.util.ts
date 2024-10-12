const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const environmentUtil = { ENVIRONMENT, API_URL }

export default environmentUtil;