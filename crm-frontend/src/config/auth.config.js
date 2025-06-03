export const authConfig = {
    apiUrl: 'http://localhost:8080',
    googleClientId: '217859805265-vlrfe1d70qp7k6uns3noos5vj8ov5ka1.apps.googleusercontent.com',
    googleRedirectUri: 'http://localhost:8080/login/oauth2/code/google',
    oauthScope: 'openid profile email',
    frontendUrl: 'http://localhost:3000',
    googleAuthUrl: 'http://localhost:8080/oauth2/authorization/google',
    loginSuccessUrl: '/dashboard',
    loginFailureUrl: '/login'
}; 