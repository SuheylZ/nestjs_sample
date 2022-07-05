import { Entity, Column, PrimaryGeneratedColumn , PrimaryColumn, JoinTable, JoinColumn, OneToOne, OneToMany, ManyToOne, ManyToMany } from 'typeorm'
import { User } from './user.entity'


@Entity({ name: 'department' })
export class Department {

  @Column({ type: 'int2' })
  @PrimaryColumn()
  departmentid: number

  @Column({type: 'varchar', length: 50})
  title: string

  @Column({type:'text'})
  notes: string

  @ManyToMany(() => User, (user)=> user.departments)
  @JoinTable({name: 'department_user'})
  users: User[]  
}
