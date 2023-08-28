import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    if (itemIndex < 0) {
      return
    }

    this.items.splice(itemIndex, 1)
  }

  async findById(answerId: string): Promise<Answer | null> {
    const item = this.items.find((item) => item.id.toValue() === answerId)

    if (!item) {
      return null
    }

    return item
  }
}
