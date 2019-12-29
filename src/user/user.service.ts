import { Injectable } from '@nestjs/common';
import { UserException } from './user.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    /**
     * 校验用户是否正确
     * @param username 用户名
     * @param pass 密码
     */
    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.findUserFromUsername(username);
        if (!user) {
            throw new UserException({ code: 20003, message: '用户不存在' });
        }
        // 密码加密核对
        const validateResult = bcrypt.compareSync(pass, user.password);
        if (validateResult) {
            return user;
        }
        throw new UserException({ code: 20001, message: '登录失败' });
    }

    /**
     * 创建用户
     * @param username 用户名
     * @param password 密码
     */
    public async create(username: string, password: string): Promise<any> {
        const user = await this.findUserFromUsername(username);
        if (user) {
            throw new UserException({ code: 20002, message: '用户已经存在' });
        }
        const users = new User();
        users.username = username;
        // 密码加密
        const salt = bcrypt.genSaltSync(10);
        users.password = bcrypt.hashSync(password, salt);
        users.roles = ['user'];
        await this.usersRepository.save(users);
    }

    /**
     * 检查用户是否被注册
     * @param username 用户名
     */
    public async checkUserFromUsername(username: string): Promise<void> {
        const user = this.findUserFromUsername(username);
        if (user) {
            throw new UserException({ code: 20002, message: '用户已经存在' });
        }
    }

    /**
     * 根据用户名查找用户信息
     * @param username 用户名
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
