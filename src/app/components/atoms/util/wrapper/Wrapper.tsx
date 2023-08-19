// This WrapperComponent is used in 'use client' components to make a loading effect
type Props = {
  children: React.ReactNode
}
const Wrapper = ({ children }: Props) => {
  return <>{children}</>
}

export default Wrapper
