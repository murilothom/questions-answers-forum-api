import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer): Promise<void> => {},
}

test('create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestionUseCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
