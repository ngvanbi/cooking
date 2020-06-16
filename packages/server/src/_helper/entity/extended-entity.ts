import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, BeforeUpdate } from 'typeorm';

export class ExtendedEntity extends BaseEntity {
  public id?: string | number;

  @Column({ name: 'is_deleted', nullable: false, default: false })
  public isDeleted: boolean;

  @ApiProperty()
  @CreateDateColumn()
  public created: Date;

  @ApiProperty()
  @CreateDateColumn()
  public updated: Date;

  @BeforeUpdate()
  updateDates() {
    this.updated = new Date();
  }
}
