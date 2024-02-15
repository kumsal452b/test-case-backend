import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { Investment, InvestmentSchema } from '../schemas/investments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { SecurityRole } from 'src/entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SecurityRole]),
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
    ]),
  ],
  providers: [InvestmentsService, UsersService],
  controllers: [InvestmentsController],
})
export class InvestmentsModule {}
