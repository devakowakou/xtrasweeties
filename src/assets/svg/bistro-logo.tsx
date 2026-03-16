import Image from 'next/image'

const BistroLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      src='/images/logos/EXTRA-SWEETIES-LOGO-WHITE.png'
      alt='Extra Sweeties Logo'
      width={60}
      height={60}
      className={className}
    />
  )
}

export default BistroLogo
