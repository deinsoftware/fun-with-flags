import styles from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <>
      <div className={styles['search-bar-container']}>
        <div className={styles['search-bar']}>
          <input type="text" name="" id="" className={styles.search} />
          <div className={styles.actions}>
            <button className={`${styles['btn-action']}`}>X</button>
            <button className={`${styles['btn-action']}`}>{'->'}</button>
            <button className={`${styles['btn-action']}`}>?</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
