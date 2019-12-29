export interface Login {
    username: string;
    password: string;
    verifyType?: number;
    verifyCode?: string;
}

export interface UserInfo {
    readonly uuid: string;
    readonly username: string;
}

export interface TokenResult {
    readonly accessToken: string;
    readonly refreshToken: string;
}

export interface UserAuthResult extends UserInfo, TokenResult {}
