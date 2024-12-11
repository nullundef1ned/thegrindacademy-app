'use client';

import Image from 'next/image'
import Avvvatars from 'avvvatars-react'
import { clsx } from 'clsx';

type AvatarProps = {
  src?: string | null;
  alt: string;
  size?: number;
  type?: 'rounded' | 'square';
}

export default function Avatar({ src, alt, size = 40, type = 'rounded' }: AvatarProps) {
  const isRounded = type == 'rounded';
  const displayedValue = alt.split(' ').map(word => word.charAt(0)).join('').toUpperCase();

  return (
    <div style={{ width: size, height: size }}
      className={clsx(isRounded && 'rounded-full', src && 'border-2 bg-gray-50 border-gray-50', 'flex-shrink-0 overflow-hidden relative')}>
      {src ?
        <Image src={src} alt={alt} fill sizes='100%' className='object-contain' /> :
        <Avvvatars value={alt} displayValue={displayedValue} size={size} radius={isRounded ? 1000 : 5} />
      }
    </div>
  )
}
