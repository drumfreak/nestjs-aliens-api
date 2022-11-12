// Create nest module
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';
import { AliensService } from './services';
import { SpaceshipsService } from './services';
import { PlanetsService } from './services';

const optionalModules = []; // Helper functions for template
import { AliensController } from './controllers';
import { SpaceshipsController } from './controllers';
import { PlanetsController } from './controllers';
const optionalControllers = []; // Helper functions for template
const optionalServices = []; // Helper functions for template
@Module({
  imports: [DatabaseModule, HttpModule, ...optionalModules],
  controllers: [
    AliensController,
    SpaceshipsController,
    PlanetsController,
    ...optionalControllers,
  ],
  providers: [
    AliensService,
    SpaceshipsService,
    PlanetsService,
    ...optionalServices,
  ],
  exports: [],
})
export class SpaceModule {}
