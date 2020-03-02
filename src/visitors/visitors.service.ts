import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Visitor} from './interfaces/visitor.interface';
import {TrackVisitorDto} from './dto/track-visitor.dto';

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

@Injectable()
export class VisitorsService {
	constructor(@InjectModel('Visitor') private readonly visitorModel: Model<Visitor>) {}

	async track(trackVisitorDto: TrackVisitorDto): Promise<Visitor> {
		const trackVisitor = new this.visitorModel(trackVisitorDto);

		return trackVisitor.save();
	}

	async countAll(page: string): Promise<number> {
		const result = await this.visitorModel
			.aggregate()
			.match({path: page})
			.group({_id: '$id', users: {$sum: 1}})
			.count('users')
			.exec();
		const users = result ? result[0].users: 0;

		return users;
	}

	async countRecent(page: string, period: number = 30 * MIN): Promise<number> {
		const periodAgo = new Date(Date.now() - period);
		const result = await this.visitorModel
			.aggregate()
			.match({timestamp: {$gte: periodAgo}, path: page})
			.group({_id: '$id', users: {$sum: 1}})
			.count('users')
			.exec();
		const users = result ? result[0].users : 0;

		return users;
	}

	async countCountry(page: string, country: string): Promise<number> {
		return this.visitorModel.find({country}).countDocuments();
	}

	async countByField(page: string, field: string): Promise<Object[]> {
		return this.visitorModel.aggregate()
			.match({path: page})
			.group({ _id: `$${field}`, count: { $sum: 1}})
			.project({
				name: '$_id',
				value: '$count',
			})
			.exec();
	}

	async countByBrowser(page: string): Promise<Object[]> {
		return this.countByField(page, 'browser');
	}

	async countByCountry(page: string): Promise<Object[]> {
		return this.countByField(page, 'country');
	}

	async countReturns(page: string, period: number = DAY): Promise<number> {
		const periodAgo = new Date(Date.now() - period);
		const total = await this.countRecent(page, period);
		const result = await this.visitorModel
			.aggregate()
			.match({timestamp: {$gte: periodAgo}, path: page})
			.group({_id: '$id', returns: {$sum: 1}})
			.match({returns: {$gt: 0}})
			.count('returns')
			.exec();
		const returns = result ? result[0].returns : 0;

		return returns / total;
	};
}
