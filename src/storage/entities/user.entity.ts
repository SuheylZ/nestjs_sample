
import { Entity, Column, PrimaryGeneratedColumn , PrimaryColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, ManyToMany } from 'typeorm'


@Entity({
  name: 'user'
})
export class User {
  @Column({ type: 'int4' })
  @PrimaryColumn()
  userid: number

  @Column({name: 'name', type: 'varchar', length: 30})
  name: string

  @Column({name: 'age', type: 'int2'})
  age: number

  @Column({name: 'address', type:'varchar', length:64})
  address: string

  @Column({ name: 'notes', type: 'varchar', length: 64 })
  notes: string
}


