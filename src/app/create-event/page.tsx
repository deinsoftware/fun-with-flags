import styles from '../page.module.css'
import CreateEventComponent from '../components/CreateEventComponent'

const CreateEvent = () => {
  return (
    <>
      <h1 className={styles.h1test}>This is a CreateEventPage</h1>

      <CreateEventComponent />
    </>
  )
}
export default CreateEvent
