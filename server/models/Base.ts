import { Entity, Column } from "typeorm"

@Entity()
export default class BaseModel {
  @Column({ primary: true, unique: true })
  name: string

  @Column()
  value?: string
}
