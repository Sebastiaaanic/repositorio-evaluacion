interface DataResCreateUser {
    id: string;
    nameUser: string;
    status: string;
}

export interface UserResDto {
    responseCode: string;
    reasonText: string;
    user: DataResCreateUser;
}