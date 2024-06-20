import { EventHandler } from '@/core/events/event-handler'
import { DomainEvents } from '@/core/events/domaint-events'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { QuestionsRepository } from '../../../forum/application/repositories/question-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionsRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return
    }

    await this.sendNotificationUseCase.execute({
      recipientId: question?.authorId.toString(),
      title: `Nova resposta em "${question.title
        .substring(0, 40)
        .concat('...')}"`,
      content: answer.excerpt,
    })
  }
}
