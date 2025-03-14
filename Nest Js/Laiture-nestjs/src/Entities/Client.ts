import { Person } from 'src/Entities/utils/Person';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Transactions } from './Transaction';
import { Banker } from './Banker';
// Name of table that u want to specify
@Entity('client')
export class Client extends Person {
  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };
  @Column({
    type: 'simple-array',
    default: ' ',
  })
  family_members: string[];

  // first argument is a function returning the target entity class(Transactions).
  // Second argument defines how the Transactions entity will reflect the relationship back to the Client.
  @OneToMany(() => Transactions, (transaction) => transaction.client)
  transactions: Transactions[];

  @ManyToMany(() => Banker)
  bankers: Banker[];
}
