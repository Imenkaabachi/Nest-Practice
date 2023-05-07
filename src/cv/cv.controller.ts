import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import {CvService} from './cv.service';
import {CreateCvDto} from './dto/create-cv.dto';
import {UpdateCvDto} from './dto/update-cv.dto';
import {JwtAuthGuard} from "../user/entities/guards/jwt-auth.guards";

@Controller('cv')
export class CvController {
    constructor(private readonly cvService: CvService) {
    }

    @Post()
    create(@Body() createCvDto: CreateCvDto,
           @Request() req: Request) {
        return this.cvService.create(createCvDto, req['user']);
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    findAll() {
        return this.cvService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cvService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
        return this.cvService.update(id, updateCvDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cvService.remove(id);
    }
}
