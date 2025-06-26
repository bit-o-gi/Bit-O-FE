import { Anniversary } from '../model/types'

const rawExampleAnniversaries = [
  {
    title: '100일',
    content: '100일',
    month: 3,
    day: 30,
    curYear: true,
  },
  {
    title: '커플링 맞춘 날',
    content: '',
    month: 4,
    day: 3,
    curYear: true,
  },
  {
    title: '소고기 먹은 날',
    content: 'ㅇㅇ이 취뽀기념 소고기 먹기',
    month: 5,
    day: 5,
    curYear: true,
  },
  {
    title: '200일',
    content: '200일',
    month: 7,
    day: 8,
    curYear: true,
  },
  {
    title: '오사카 여행',
    content: '첫 커플 여행 출발',
    month: 7,
    day: 15,
    curYear: true,
  },
  {
    title: '300일',
    content: '300일',
    month: 10,
    day: 16,
    curYear: true,
  },
  {
    title: '1주년',
    content: '1주년',
    month: 12,
    day: 20,
    curYear: true,
  },
  {
    title: '400일',
    content: '400일',
    month: 1,
    day: 24,
    curYear: false,
  },
  {
    title: '500일',
    content: '500일',
    month: 5,
    day: 4,
    curYear: false,
  },
]

function generateExampleGuideAnniversaries(): Anniversary[] {
  const now = new Date()

  return rawExampleAnniversaries.map(({ title, content, month, day, curYear }, idx) => {
    const year = curYear ? now.getFullYear() : now.getFullYear() + 1
    const anniversaryDate = new Date(year, month + 1, day)

    return {
      id: idx + 1,
      title,
      content,
      anniversaryDate,
      updateTime: '',
      writeTime: '',
      withPeopleId: Number('Example'),
      writerId: Number('Example'),
    }
  })
}

export const EXAMPLE_GUIDE_ANNIVERSARIES = generateExampleGuideAnniversaries()
