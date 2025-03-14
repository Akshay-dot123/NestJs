import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';

export enum TransactionTypes {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}
// Name of table that u want to specify
@Entity('transactions')
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionTypes,
  })
  type: string;

  @Column({
    type: 'numeric',
  })
  amount: number;
  // CASCADE means that if a Client is deleted, all the related Transactions will also be automatically deleted.
  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'client_id',
  })
  client: Client;
}
