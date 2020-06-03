let tokenInfo = {
    createdAt: null,
    expiration: null,
    accessToken: null
};

export function setTokenInfo(token){
    tokenInfo.accessToken = token.accessToken;
    tokenInfo.createdAt = token.createdAt;
    tokenInfo.expiration = token.expiration;
};

export function getTokenInfo(){
    return tokenInfo;
}