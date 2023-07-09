import styles from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <input type="text" name="" id="" className={styles.search} />
          <div className={styles.actions}>
            <button className={`${styles.btnAction}`}>X</button>
            <button className={`${styles.btnAction}`}>{'->'}</button>
            <button className={`${styles.btnAction}`}>?</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
