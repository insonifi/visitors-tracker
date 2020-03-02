import { Controller, Get, Param, Query} from '@nestjs/common';

import { TrackVisitorDto } from './dto/track-visitor.dto';
import { VisitorsService } from './visitors.service';
import {Visitor} from './interfaces/visitor.interface';

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

@Controller('api')
export class VisitorsController {
	constructor (private readonly visitorService: VisitorsService) {}

	period(min: number = 0, hour: number = 0, day: number = 0): number {
		return min * MIN + hour * HOUR + day * DAY;
	}

	@Get('visitors/:page')
	async countAll(@Param('page') page: string): Promise<number> {
		return this.visitorService.countAll(page);
	}

	@Get('visitors/recent/:page')
	async countRecent(
		@Param('page') page: string,
	 	@Query('min') min?: number,
	 	@Query('hour') hour?: number,
	 	@Query('day') day?: number,
	): Promise<number> {
		return this.visitorService.countRecent(page, this.period(min, hour, day));
	}

	@Get('visitors/returns/:page')
	async countReturns(
		@Param('page') page: string,
	 	@Query('min') min: number,
	 	@Query('hour') hour: number,
	 	@Query('day') day: number,
): Promise<number> {
		return this.visitorService.countReturns(page, this.period(min, hour, day));
	}

	@Get('visitors/country/:country/:page')
	async countCountry(@Param('country') country: string, @Param('page') page: string): Promise<number> {
		return this.visitorService.countCountry(page, country);
	}

	@Get('visitors/country/:page')
	async countByCountry(@Param('page') page: string): Promise<Object[]> {
		return this.visitorService.countByCountry(page);
	}

	@Get('visitors/browser/:page')
	async countByBrowser(@Param('page') page: string): Promise<Object[]> {
		return this.visitorService.countByBrowser(page);
	}
}
