import styles from './page.module.css'
import SearchBar from './components/SearchBar'
import CardPost from './components/CardPost'

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <div className={styles['container-cards']}>
        <CardPost />
        <CardPost />
      </div>
    </>
  )
}

export default HomePage
