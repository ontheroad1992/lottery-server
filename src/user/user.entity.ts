import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        generated: 'uuid',
        comment: '用户 uuid',
    })
    uuid: string;

    @Column('varchar', {
        length: 40,
        unique: true,
        comment: '用户名',
    })
    username: string;

    @Column('varchar', {
        length: 40,
        nullable: true,
        unique: true,
        comment: '用户昵称',
    })
    nickname: string;

    @Column('varchar', {
        length: 255,
        name: 'icon_url',
        nullable: true,
        unique: true,
        comment: '用户图片',
    })
    iconUrl?: string;

    @Column('simple-array', {
        comment: '用户角色',
    })
    roles?: string[];

    @Exclude()
    @CreateDateColumn({ name: 'create_time' })
    createTime?: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'update_time' })
    updateTime?: Date;

    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
    }
}
