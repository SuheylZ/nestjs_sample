import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions} from '@nestjs/typeorm'
import { Department } from './entities/department.entity';
import { User } from './entities/user.entity';

export const storageConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.17.0.3',
  port: 5432,    
  username: 'admin',
  password: 'password',
  database: 'user_storage',
  schema: 'public',    
  entities: [User, Department],
  synchronize: true
}


@Injectable()
export class StorageService {

}
