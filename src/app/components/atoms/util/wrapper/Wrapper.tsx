// This WrapperComponent is used in 'use client' components to make a loading effect

const Wrapper = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

export default Wrapper
