// Create nest module
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';
import { EarthHealthController } from './controllers';
import { EarthHealthService } from './services';
import { HumansService } from './services';
import { LocationsService } from './services';
const optionalModules = []; // Helper functions for template
import { HumansController } from './controllers';
import { LocationsController } from './controllers';

const optionalControllers = []; // Helper functions for template
const optionalServices = []; // Helper functions for template
@Module({
  imports: [DatabaseModule, HttpModule, ...optionalModules],
  controllers: [
    EarthHealthController,
    HumansController,
    LocationsController,
    ...optionalControllers,
  ],
  providers: [
    EarthHealthService,
    HumansService,
    LocationsService,
    ...optionalServices,
  ],
  exports: [],
})
export class EarthModule {}
