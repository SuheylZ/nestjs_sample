
import { Entity, Column, PrimaryGeneratedColumn , JoinTable, PrimaryColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, ManyToMany } from 'typeorm'
import { Department } from './department.entity'


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

  @ManyToMany(() => Department, (department)=> department.users)
  @JoinTable({ name: 'department_user' })
  departments: Department[]
}


