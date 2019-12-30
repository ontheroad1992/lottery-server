import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Lottery {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {
        name: 'user_id',
        comment: '参与人员',
    })
    userId: number;

    @Column('int', {
        name: 'side_user_id',
        comment: '赠送人用户id',
        default: null,
    })
    sideUserId?: number;

    @Column('varchar', {
        comment: '留言',
        default: null,
    })
    comments?: string;

    constructor(partial?: Partial<Lottery>) {
        Object.assign(this, partial);
    }
}
