import Image from 'next/image'

const LoadingPage = () => {
  return (
    <>
      <section
        style={{
          display: 'grid',
          placeContent: 'center',
          height: '100%',
        }}
      >
        <Image
          alt="Loading"
          height={100}
          src="/img/ui/loader.svg"
          width={100}
        />
      </section>
    </>
  )
}

export default LoadingPage
