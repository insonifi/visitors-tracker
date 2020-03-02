import { ApiProperty } from '@nestjs/swagger';

export class TrackVisitorDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	timestamp: Date;

	@ApiProperty()
	country: string;

	@ApiProperty()
	browser: string;

	@ApiProperty()
	path: string;
}
