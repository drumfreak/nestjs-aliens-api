// Create nest module
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';
import { SpaceHealthController } from './controllers';
import { SpaceHealthService } from './services';
import { AliensService } from './services';
const optionalModules = []; // Helper functions for template
import { AliensController } from './controllers';

const optionalControllers = []; // Helper functions for template
const optionalServices = []; // Helper functions for template
@Module({
  imports: [DatabaseModule, HttpModule, ...optionalModules],
  controllers: [
    SpaceHealthController,
    AliensController,
    ...optionalControllers,
  ],
  providers: [SpaceHealthService, AliensService, ...optionalServices],
  exports: [],
})
export class SpaceModule {}
