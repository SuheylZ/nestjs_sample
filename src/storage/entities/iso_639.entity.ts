import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('iso_639')
export class ISO639 {
  @Column({ type: 'char', length: 2 })
  @PrimaryColumn()
  code2: string
  @Column({type: 'char', length: 3})
  code3: string
  @Column({type:'varchar', length: 50})
  country: string
  @Column({type:'varchar', length: 100})
  native: string
  @Column({ type: 'varchar', length: 150 })
  url: string
}

