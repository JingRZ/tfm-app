import { Platform } from 'react-native';
import useReqSessionToken from "../hooks/useReqSessionToken";

const StorageManager = Platform.select({
    web: () => require('./StorageManager.web').default,
    default: () => require('./StorageManager.native').default,
})();

let instance = null;

class SessionManager {

    constructor() {
        if (instance) {
            return instance;
        }
        
        this.isLogged = this.getSessionToken() != null;
        instance = this;
    }

    setIsLogged(logged) {
        this.isLogged = logged;
    }

    getIsLogged() {
        return this.isLogged;
    }

    async getSessionToken() {
        try {
            const token = await StorageManager.getItem('session');
            console.log('getSessionToken', token);
            return token;

        } catch (error) {
            console.error(`Error at getSessionToken`, error);
        }
    }

    async setSessionToken(token) {
        try {
            await StorageManager.storeItem('session', token);
        } catch (error) {
            console.error(`Error at setSessionToken`, error);
        }
    }

    async getRefreshToken() {
        try {
            const token = await StorageManager.getItem('refreshToken');
            console.log('getRefreshToken', token)
            return token;

        } catch (error) {
            console.error(`Error at getRefreshToken`, error);
        }
    }

    async setRefreshToken(token) {
        try {
            await StorageManager.storeItem('refreshToken', token);
        } catch (error) {
            console.error(`Error at setRefreshToken`, error);
        }
    }

    async refreshSessionToken() {
        try {
            const {token, error, handleRequestSessionTokenRefresh} = useReqSessionToken();
            await handleRequestSessionTokenRefresh();
            await this.setSessionToken(token);

            if (error) {
                console.error('Error at refreshSessionToken:', error);
                return;
            }

            return token

        } catch (error) {
            console.error(`Error at refreshSessionToken`, error);
        }
    }

}

/*
    When token expires, you receive this msg:
    {
  "errors": [
    {
      "message": "Context creation failed: jwt expired",
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "TokenExpiredError: Context creation failed: jwt expired",
            "    at /server/node_modules/jsonwebtoken/verify.js:190:21",
            "    at getSecret (/server/node_modules/jsonwebtoken/verify.js:97:14)",
            "    at module.exports [as verify] (/server/node_modules/jsonwebtoken/verify.js:101:10)",
            "    at ApolloServer.context (file:///server/index.js:59:30)",
            "    at ApolloServer.graphQLServerOptions (/server/node_modules/apollo-server-core/dist/ApolloServer.js:511:34)",
            "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
          ]
        }
      }
    }
  ]
}

When token is invalid, you receive this msg:
{
  "errors": [
    {
      "message": "Context creation failed: invalid token",
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "JsonWebTokenError: Context creation failed: invalid token",
            "    at module.exports [as verify] (/server/node_modules/jsonwebtoken/verify.js:82:17)",
            "    at ApolloServer.context (file:///server/index.js:59:30)",
            "    at ApolloServer.graphQLServerOptions (/server/node_modules/apollo-server-core/dist/ApolloServer.js:511:34)",
            "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
          ]
        }
      }
    }
  ]
}
*/

export default new SessionManager();