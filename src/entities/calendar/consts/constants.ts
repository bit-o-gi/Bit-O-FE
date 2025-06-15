export const DAY_OF_THE_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export const COLORS = {
  LAVENDER: '#9a9cff',
  RED: '#dc2227',
  LIGHT_PURPLE: '#daadfe',
  LIGHT_BLUE: '#a4bdfd',
  BLUE: '#5485ee',
  TEAL: '#47d6dc',
  MINT: '#7ae7be',
  GREEN: '#51b749',
  ORANGE: '#ffb878',
  LIGHT_GRAY: '#e1e1e1',
}

const rawExampleSchedules = [
  { title: '제주도 여행', startDay: 2, endDay: 5, color: 'ORANGE' },
  { title: '지연이랑 성수동', startDay: 15, endDay: 15, color: 'TEAL' },
  { title: '가족 식사', startDay: 20, endDay: 20, color: 'LIGHT_PURPLE' },
  { title: '자격증 시험', startDay: 27, endDay: 27, color: 'BLUE' },
]

function generateEcampleGuideSchedules() {
  const now = new Date()

  return rawExampleSchedules.map(({ title, startDay, endDay, color }, idx) => {
    const startDate = new Date(now.getFullYear(), now.getMonth(), startDay)
    const endDate = new Date(now.getFullYear(), now.getMonth(), endDay)

    return {
      id: idx + 1,
      nickName: 'Example',
      index: 0,
      userId: Number('Example'),
      title,
      content: title,
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      color
    }
  })
}

export const EXAMPLE_GUIDE_SCHEDULES = generateEcampleGuideSchedules()

