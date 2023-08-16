import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question): Promise<Question> => {
    return question
  },
}

test('create a question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Ts ou Js?',
  })

  expect(question.id).toBeTruthy()
})
