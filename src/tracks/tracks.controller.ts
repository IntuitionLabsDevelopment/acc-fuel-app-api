import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: Prisma.TrackCreateInput) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  getTracks(@Query('simId') simId?: string) {
    if (simId) {
      return this.tracksService.findBySim(+simId);
    } else {
      return this.tracksService.findAll();
    }
  }

  @Get()
  getTracksBySim(@Query('simId') simId: string) {
    return this.tracksService.findBySim(parseInt(simId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracksService.remove(+id);
  }
}
