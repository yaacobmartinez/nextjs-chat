import { ImageResponse } from 'next/server'

import { getSharedChat } from '@/app/actions'

export const runtime = 'edge'

export const alt = 'AI Chatbot'

export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

interface ImageProps {
  params: {
    id: string
  }
}

export default async function Image({ params }: ImageProps) {
  const chat = await getSharedChat(params.id)

  if (!chat || !chat?.sharePath) {
    return null
  }

  const textAlign = chat?.title?.length > 40 ? 'items-start' : 'items-center'

  return new ImageResponse(
    (
      <div tw="flex w-full items-start h-full flex-col bg-[#09090b] text-white p-[80px]">
        <div tw="flex flex-col w-full pt-[40px]">
          <div tw={`flex w-full ${textAlign}`}>
            <div tw="flex h-18 w-18 items-center justify-center rounded-md border border-[#9b9ba4]">
                0
            </div>
            <div tw="flex text-white font-bold text-4xl leading-normal ml-10">
              {chat.title.length > 120
                ? `${chat.title.slice(0, 120)}...`
                : chat.title}
            </div>
          </div>
          <div tw="flex w-full mt-14 items-start">
            <div tw="flex h-18 w-18 items-center justify-center rounded-md border border-[#9b9ba4]">
              0
            </div>
            <div tw="flex text-white font-bold text-6xl leading-none ml-10">
              ...
            </div>
          </div>
        </div>
        <div tw="flex items-center justify-between w-full mt-auto">
          <div tw="flex items-center">
            0
            <div tw="flex text-[1.8rem] ml-4 text-[#9b9ba4]">
              Built with{' '}
              <div tw="flex text-[#eaeaf0] ml-2 mr-2">Vercel AI SDK</div> &
              <div tw="flex text-[#eaeaf0] ml-2">KV</div>
            </div>
          </div>
          <div tw="text-[1.8rem] ml-auto text-[#9b9ba4]">chat.vercel.ai</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
