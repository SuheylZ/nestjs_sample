
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity({
  name: 'user'
})
export class User {
  @PrimaryGeneratedColumn()
  @Column({type: 'int4'})
  id: number

  @Column({name: 'name', type: 'varchar', length: 30})
  name: string

  @Column({name: 'age', type: 'int2'})
  age: number

  @Column({name: 'address', type:'varchar', length:64})
  address: string

  @Column({name: 'address', type:'varchar', length:64})
  notes: string
}
