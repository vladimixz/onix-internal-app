import { Constants } from 'expo'

const ENV = {
    dev: {
        apiUrl: 'http://staging.onix-systems.com'
    },
    staging: {
        apiUrl: 'http://staging.onix-systems.com'
    },
    production: {
        apiUrl: 'https://onix-systems.com'
    }
}

function getEnvVars(env = '') {
    if (env === null || env === undefined || env === '') return ENV.dev
    if (env.indexOf('dev') !== -1) return ENV.dev
    if (env.indexOf('staging') !== -1) return ENV.dev
    if (env.indexOf('prod') !== -1) return ENV.production
}

export default getEnvVars(Constants.manifest.releaseChannel)