import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  timeout: 3000,
  // headers: {},
  // withCredentials: false,
})

instance.interceptors.request.use(
  function (config) {
    // 스토리지에서 access토큰 가져오는 로직
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      window.location.href = '/login'
      return config
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  async function (response) {
    // 2xx 범위에 있는 상태 코드인경우
    return response
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드인 경우
    // console.log(error)
    const {
      config,
      response: { status, data },
    } = error

    if (status === 401 && data?.message === 'Access Token is Expired') {
      const cookies = document.cookie
      const refreshToken = cookies.split('refresh_token=')[1]
      if (!refreshToken) {
        console.error(`${data.error}`)
        window.location.href = '/login'
      }

      try {
        const tokenRefreshResult = await instance.post('auth/token', {
          refreshToken,
        })
        if (tokenRefreshResult.status === 201) {
          console.log('🚀 ~ tokenRefreshResult:', tokenRefreshResult)

          // 새로 발급받은 토큰을 스토리지에 저장
          const { accessToken } = tokenRefreshResult.data
          localStorage.setItem('access_token', accessToken)

          // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
          config.headers.Authorization = `Bearer ${accessToken}`
          return instance(config)
        } else {
          // 백엔드 에러메세지 (	Error: response status is 500 )
          // logoutAndHome() // 전체 프로세스 정해지면 추가
        }
      } catch (err) {
        console.error(err)
        // logoutAndHome() // 전체 프로세스 정해지면 추가
      }
    }

    return Promise.reject(error)
  },
)

export { instance, baseURL }

// redirect 이슈
// next.js 에서는 location.href = '/' 따위를 쓸수가 없음
// useRouter 등을 사용해서 리다이렉트해야되는데 React 컴포넌트 내에서만 사용할 수 있으므로
// 추가로 관리해야됨

// 현업 쿠키 추천 option
// const cookieOptions = {
//   httpOnly: true,        // XSS 방지
//   secure: true,          // HTTPS만 허용
//   sameSite: 'strict',    // CSRF 방지
//   path: '/',             // 쿠키 사용 경로
//   domain: '.example.com' // 쿠키 사용 도메인
// }
