interface IAuthenticateService {

    authenticate(basicAuthorization: string) : Promise<AuthenticateDTO>

}

export default IAuthenticateService;