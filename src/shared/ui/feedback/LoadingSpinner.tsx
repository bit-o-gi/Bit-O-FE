'use client'

/** 로딩 스피너 */
export const LoadingSpinner = () => {
  return (
    <div
      role="status"
      className="grid h-[100vh] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible "
    >
      <div
        className="w-10 h-10 rounded-full animate-spin
                    border-4 border-solid border-pink border-t-transparent"
      ></div>
    </div>
  )
}
