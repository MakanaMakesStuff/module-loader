import { Entity, Column } from "typeorm"
import BaseModel from "./Base"

@Entity()
export default class User implements BaseModel {
  @Column({ primary: true })
  name: string

  @Column()
  email: string
}
