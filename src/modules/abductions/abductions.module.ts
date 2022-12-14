// Create nest module
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';
import { AbductionsService } from './services';
const optionalModules = []; // Helper functions for template
import { AbductionsController } from './controllers';

const optionalControllers = []; // Helper functions for template
const optionalServices = []; // Helper functions for template
@Module({
  imports: [DatabaseModule, HttpModule, ...optionalModules],
  controllers: [AbductionsController, ...optionalControllers],
  providers: [AbductionsService, ...optionalServices],
  exports: [],
})
export class AbductionsModule {}
