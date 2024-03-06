import { Model, Table, Column, DataType, Default, Unique, AllowNull, AutoIncrement } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize'; 
import config from '../config/config.json';

@Table({
  freezeTableName: true,
  timestamps: false,
})
class User extends Model<User> {
  @Default(DataType.UUIDV4)
  @AllowNull(true)
  @Column(DataType.UUID)
  user_id!: string;
  
    
    @AutoIncrement
    @Column({primaryKey: true})
    id!: number;
  
    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    numb: string;
  
    @Unique
    @Column(DataType.STRING)
    email: string;
  
    @Column(DataType.STRING)
    password!: string;
  }

const sequelize = new Sequelize(
  config['development'].database,
  config['development'].username,
  config['development'].password,
  {
    host: config['development'].host,
    dialect: config['development'].dialect as Dialect,
  }
);

sequelize.addModels([User]);

export { User, sequelize };
