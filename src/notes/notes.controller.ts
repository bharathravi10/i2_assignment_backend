import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from 'src/schemas/notes.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('add')
  async createNote(@Body() createNotesDto: any): Promise<Notes> {
    return this.notesService.createNotes(createNotesDto);
  }

  @Put('update/:userId/:noteId')
  async updateNote(
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
    @Body() updateData: any,
  ): Promise<Notes> {
    // Pass both userId and noteId to the service method
    return this.notesService.updateNoteByUserId(userId, noteId, updateData);
  }
  // implement to get a single note
  @Get('singleNote/:userId/:noteId')
  async getNote(
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
  ): Promise<Notes> {
    return this.notesService.getNoteByUserIdAndNoteId(userId, noteId);
  }

  @Get()
  getAllNote(): Promise<Notes[]> {
    return this.notesService.getAllnotes();
  }

  // Delete a note by both user_id and note_id
  @Delete('delete/:userId/:noteId')
  async deleteNote(
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
  ): Promise<string> {
    return this.notesService.deleteNoteByUserIdAndNoteId(userId, noteId);
  }
}
