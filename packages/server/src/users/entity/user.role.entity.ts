import { ApiProperty } from '@nestjs/swagger';
import { ExtendedEntity } from '@helper/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role')
export class UserRoleEntity extends ExtendedEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'role_name', type: 'varchar', nullable: false })
  roleName: string;
}
