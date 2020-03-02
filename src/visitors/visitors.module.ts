import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsController } from './visitors.controller';
import { VisitorSchema } from './schemas/visitor.schema';
import { VisitorsService } from './visitors.service';
import { VisitorsMiddleware} from './visitors.middleware';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://mongo', {auth: {user: process.env.DB_USER, password: process.env.DB_PASSWORD}}),
		MongooseModule.forFeature([{name: 'Visitor', schema: VisitorSchema}])
	],
	controllers: [VisitorsController],
	providers: [VisitorsService],
})
export class VisitorsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(VisitorsMiddleware)
		.exclude({path: '/api/*', method: RequestMethod.ALL})
		.forRoutes({path: '', method: RequestMethod.ALL});
	}
}
