import Head from './Head'
import Body from './Body'
import { AppLayout } from '@/pages/Layout'

const HomePage = () => {
  return (
    <AppLayout>
      <div className='relative flex flex-col w-full h-full self-center' id='popup-layout'>
        <Head />
        <Body />
      </div>
    </AppLayout>
  )
}

export default HomePage
