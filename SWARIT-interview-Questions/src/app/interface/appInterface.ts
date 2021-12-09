export interface AuthResponse{
        email: string,
        password: string,
        displayName: string,
        captchaResponse: string,
        idToken: string,
        emailVerified: boolean,
        photoUrl: string,
        disabled: boolean,
        localId: string,
        phoneNumber: string,
        tenantId: string,
        targetProjectId: string
}