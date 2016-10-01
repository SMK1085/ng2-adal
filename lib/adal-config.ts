export class AdalConfig implements adal.Config{
    tenant?: string;
    clientId: string;
    redirectUri?: string;
    cacheLocation?: string;
    displayCall?: (urlNavigate: string) => any;
    correlationId?: string;
    loginResource?: string;
    resource?: string;
    endpoints?: any;  // If you need to send CORS api requests.
    extraQueryParameter?: string;
    postLogoutRedirectUri?: string; // redirect url after succesful logout operation
}