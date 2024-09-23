import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'enterprises', // Nombre de la tabla en la base de datos
})
export class Enterprises extends Model {
@PrimaryKey
@AutoIncrement
@Column(DataType.INTEGER)
  id!: number;  // Usa la afirmación `!` para indicar que siempre estará inicializado.

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.DATE)
  date!: Date;

  @Column(DataType.STRING)
  type!: string;

  @Column(DataType.STRING)
  comments!: string;

  @Column(DataType.STRING)
  favorite!: string;  
}
