import { Bomb, Flag } from 'lucide-react'

export function MinesweeperBanner({counterFlags}) {
  return (
    <div className='w-full bg-gradient-to-r from-slate-800 to-slate-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className='h-10 w-10 bg-gray-200 rounded border-2 border-gray-400 flex items-center justify-center shadow-inner'>
              <Bomb className='h-6 w-6 text-slate-800' />
            </div>
            <div className='absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse' />
          </div>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight'>
            Busca Minas
          </h1>
        </div>
      </div>

      <div className='mt-4 flex justify-center'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center'>
              <span className='font-mono font-bold text-blue-600'>1</span>
            </div>
            <div className='h-8 w-8 bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center'>
              <span className='font-mono font-bold text-green-600'>2</span>
            </div>
            <div className='h-8 w-8 bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center'>
              <span className='font-mono font-bold text-red-600'>3</span>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-slate-600 px-3 py-1 rounded-md'>
            <Flag className='h-5 w-5 text-red-500' />
            <span className='font-mono font-bold text-white'>{counterFlags}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
