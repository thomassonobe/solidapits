import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvier";
import { IUsersRepository } from "../../repositories/IUsersRespository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    private usersRepository: IUsersRepository;

    constructor(
        usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ){
        this.usersRepository = usersRepository;
    }

    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        // await this.mailProvider.sendMail({
        //     to:{
        //         name: data.name,
        //         email: data.email
        //     },
        //     from: {
        //         name: ' Equipe do App',
        //         email: 'equipe@meuapp.com'
        //     },
        //     subject:'Seja bem-vindo à plataforma',
        //     body: '<p>Você já pode fazer login em nossa plataforma</p>'
        // })
    }
}