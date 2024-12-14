import { logo1 } from '@/data'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img
        src={logo1}
        alt="Shuriken Logo"
        className="w-10 h-10 outline-none   rounded-full animate-spin"
      />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
    </div>
  )
}

export default LoadingSpinner