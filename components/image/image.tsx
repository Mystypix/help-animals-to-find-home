import NextImage from "next/image"

const customLoader = ({ src }: any) => {
  return src
}

export default function Image(props: any) {
  return (
    <NextImage
      {...props}
      loader={customLoader}
    />
  )
}