import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Client } from './Client';
import { Person } from './utils/Person';
// Name of table that u want to specify
@Entity('banker')
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column({
    unique: true,
  })
  employee_number: number;

  @ManyToMany(() => Client)
  // creates a junction table(named bankers_clients) to store the relationship between Client and Banker.
  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'banker', // Column name on the junction table that refers to the "banker" side
      referencedColumnName: 'id', // The primary key column on the "banker" entity
    },
    inverseJoinColumn: {
      name: 'client', // Column name on the junction table that refers to the "client" side
      referencedColumnName: 'id', // The primary key column on the "client" entity
    },
  })
  clients: Client[];
}
