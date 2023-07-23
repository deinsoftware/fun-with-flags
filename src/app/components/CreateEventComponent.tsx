'use client'

import ComboboxCountries from './ComboboxCountries/ComboboxCountries'
import styles from './CreateEventComponent.module.css'

const CreateEventComponent = () => {
  return (
    <>
      <div className={styles['container-form']}>
        <form action="" className={styles.form}>
          <div>
            <input
              type="text"
              name=""
              id=""
              className={styles['full-width']}
              placeholder="Event name"
            />
          </div>

          <div className={styles['container-half-width']}>
            <div>
              <input
                type="time"
                name=""
                id=""
                className={styles['full-width']}
              />
            </div>
            <div>
              <input
                type="date"
                name=""
                id=""
                className={styles['full-width']}
              />
            </div>
          </div>

          <div className={styles['container-half-width']}>
            <div className={styles.halfWidth}>
              <select name="" id="" className={styles['full-width']}>
                <option value="tm-1">Time zone 1</option>
                <option value="tm-2">Time zone 2</option>
              </select>
            </div>
            <div className={styles.halfWidth}>
              <select name="" id="" className={styles['full-width']}>
                <option value="lg-1">First language</option>
                <option value="lg-2">Second language</option>
              </select>
            </div>
          </div>

          <div>
            <input
              type="url"
              name=""
              id=""
              placeholder="Hyperlink"
              className={styles['full-width']}
            />
          </div>
          <div className={styles.prueba}>
            {/* // TODO: El div que envuelve los dos textarea, tiene como 2-3 más de altura | Help */}
            <textarea
              name=""
              id=""
              placeholder="Description"
              className={styles['full-width']}
            />
          </div>
          <div>
            {/* //! TODO: how to do an update image? */}
            <input
              type="text"
              name=""
              id=""
              placeholder="how to do an update image?"
              className={styles['full-width']}
            />
          </div>
          <ComboboxCountries format={24} />
          <div>
            {/* // TODO: El div que envuelve los dos textarea, tiene como 2-3 más de altura | Help */}
            <textarea
              name=""
              id=""
              placeholder="🚩 🚩 🚩 🚩 🚩 🚩 🚩 🚩"
              className={styles['full-width']}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateEventComponent
