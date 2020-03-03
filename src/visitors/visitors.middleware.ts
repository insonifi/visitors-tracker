import maxmind, {CountryResponse, Reader} from 'maxmind';
import * as uuid from 'uuid';
import * as useragent from 'useragent';
import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { VisitorsService } from './visitors.service';

const UKNOWN = 'uknown';

@Injectable()
export class VisitorsMiddleware implements NestMiddleware {
	lookupCountry: Reader<CountryResponse>;

	constructor(private readonly visitorsService: VisitorsService) {
		this.initGeo();
	}

	async initGeo() {
		this.lookupCountry = await maxmind.open<CountryResponse>(require('maxmind-country'));
	}
  use(req: Request, res: Response, next: () => void) {
		if (!req.accepts('html')) {// TODO: find better way to determine page load
			next();

			return;
		}

		let id;

		if (req.cookies.trackid) {
			id = req.cookies.trackid;
		} else {
			id = uuid.v4();
			res.cookie('trackid', id);
		}

		const countryResult = this.lookupCountry.get(req.ip);
		const visitor = {
			browser: useragent.parse(req.get('User-Agent')).family,
			country: countryResult ? countryResult.country['iso-code'] : UKNOWN,
			id,
			timestamp: new Date(),
			path: req.path.split('/')[1],// take first folder part from path
		};

		console.log(req.baseUrl);
		console.log('visitor', req.path, visitor);

		this.visitorsService.track(visitor);
    next();
  }
}
