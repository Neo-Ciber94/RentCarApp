import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Brand } from "./Brand";

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brandId!: number;

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand!: Brand;
}
