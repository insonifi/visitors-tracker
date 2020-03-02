import * as path from 'path';
import {Module} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import {VisitorsModule} from './visitors/visitors.module';

@Module({
  imports: [
		VisitorsModule,
		ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'dash', 'dist', 'dash'),
			// serveRoot: 'app',
      exclude: ['/api/**'],
    })
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
