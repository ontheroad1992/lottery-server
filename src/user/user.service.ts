import { Injectable } from '@nestjs/common';
import { UserException } from './user.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    /**
     * 校验用户是否正确
     * @param username 用户名
     */
    async validateUser(username: string): Promise<User> {
        const user = await this.findUserFromUsername(username);
        if (!user) {
            throw new UserException({ code: 20003, message: '用户不存在' });
        }
        return user;
    }

    /**
     * 创建用户
     * @param username 用户名
     * @param nickname 密码
     */
    public async create(username: string, nickname: string): Promise<any> {
        const user = await this.findUserFromUsername(username);
        if (user) {
            throw new UserException({ code: 20002, message: '用户已经存在' });
        }
        const users = new User();
        users.username = username;
        users.nickname = nickname;
        users.roles = ['user'];
        await this.usersRepository.save(users);
    }

    /**
     * 检查用户是否被注册
     * @param username 用户名
     * @param nickname 姓名
     */
    public async checkUserFromUsername(username: string, nickname: string): Promise<void> {
        if (username) {
            const user = await this.findUserFromUsername(username);
            if (user) {
                throw new UserException({ code: 20002, message: '用户已经存在' });
            }
        }
        if (nickname) {
            const user = await this.findUserFromNickname(nickname);
            if (user) {
                throw new UserException({ code: 20003, message: '姓名已经存在' });
            }
        }
    }

    private async findUserFromNickname(nickname: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { nickname },
        });
        return user;
    }

    /**
     * 根据用户名查找用户信息
     * @param username 用户名 / 手机号
     */
    private async findUserFromUsername(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { username },
        });
        return user;
    }

    /**
     * 根据 uuid 获取用户信息
     * @param uuid 用户UUID
     */
    public async findUserFromUUid(uuid: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { uuid },
        });
        if (!user) {
            throw new UserException({ code: 20003, message: '用户不存咋' });
        }
        return user;
    }
}
