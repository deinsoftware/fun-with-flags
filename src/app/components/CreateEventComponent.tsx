import styles from './CreateEventComponent.module.css'

const CreateEventComponent = () => {
  return (
    <>
      <h1>Title</h1>
      {/* // ! Cambiar el h1 a un componente, porque se repite en todas las páginas y luego pasarlo como prop, dependiendo de dónde se esté */}

      <div className={styles.containerForm}>
        <form action="" className={styles.form}>
          <div>
            <input
              type="text"
              name=""
              id=""
              className={styles.fullWidth}
              placeholder="Event name"
            />
          </div>

          <div className={styles.containerHalfWidth}>
            <div>
              <input type="time" name="" id="" className={styles.fullWidth} />
            </div>
            <div>
              <input type="date" name="" id="" className={styles.fullWidth} />
            </div>
          </div>

          <div className={styles.containerHalfWidth}>
            <div className={styles.halfWidth}>
              <select name="" id="" className={styles.fullWidth}>
                <option value="tm-1">Time zone 1</option>
                <option value="tm-2">Time zone 2</option>
              </select>
            </div>
            <div className={styles.halfWidth}>
              <select name="" id="" className={styles.fullWidth}>
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
              className={styles.fullWidth}
            />
          </div>
          <div className={styles.prueba}>
            {/* // TODO: El div que envuelve los dos textarea, tiene como 2-3 más de altura | Help */}
            <textarea
              name=""
              id=""
              placeholder="Description"
              className={styles.fullWidth}
            />
          </div>
          <div>
            {/* //! TODO: how to do an update image? */}
            <input
              type="text"
              name=""
              id=""
              placeholder="how to do an update image?"
              className={styles.fullWidth}
            />
          </div>
          <div>
            {/* // TODO: El div que envuelve los dos textarea, tiene como 2-3 más de altura | Help */}
            <textarea
              name=""
              id=""
              placeholder="🚩 🚩 🚩 🚩 🚩 🚩 🚩 🚩"
              className={styles.fullWidth}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateEventComponent
