import { Children } from 'react'

type EachProps<T> = {
  render: (item: T, index: number) => any;
  of?: T[];
}

export default function Each<T>({ render, of }: EachProps<T>) {
  if (!of) return null;

  return (
    Children.toArray(of.map((item, index) => render(item, index)))
  )
}
