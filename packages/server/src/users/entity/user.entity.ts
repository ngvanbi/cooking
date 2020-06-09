import { ApiProperty } from '@nestjs/swagger';
import { ExtendedEntity } from '@helper/index';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity extends ExtendedEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty()
  @IsEmail()
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @MinLength(8)
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string;

  @ApiProperty()
  @Column({ name: 'online_at' })
  onlineAt: Date;

  @ApiProperty()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
