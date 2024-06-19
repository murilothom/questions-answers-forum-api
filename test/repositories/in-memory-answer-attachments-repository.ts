import { AnswerAttachmentsRepository } from '../../src/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '../../src/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const items = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return items
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const items = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = items
  }
}
