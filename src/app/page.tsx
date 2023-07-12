import styles from './page.module.css'
import SearchBar from './components/SearchBar'
import CardPost from './components/CardPost'

const posts = [
  {
    id: 1,
    srcImage: '/img/placeholderlogo.png',
    title: '¿Qué es una Zona Horaria?',
    text: `Es conveniente que las áreas en estrecha comunicación comercial o de otra índole se mantengan al mismo tiempo, por lo que las zonas horarias...`,
    date: 'Abr 27, 2054',
  },
  {
    id: 2,
    srcImage: '/img/placeholderlogo.png',
    title: 'Guerra civil china (1949)',
    text: `Antes de la guerra civil china de 1949 y del establecimiento de la República Popular de China (PRC), China fue dividida en cinco zonas horarias.`,
    date: 'Ago 21, 1950',
  },
  {
    id: 3,
    srcImage: '/img/placeholderlogo.png',
    title: 'Uso horario en los polos',
    text: `El horario en los polos podría ser un problema. Es donde se juntan todos los meridianos, tanto en el norte como en el sur, por lo tanto, si te encuentras justo en el punto donde todas estas líneas imaginarias se unen, teóricamente podrías cambiar de horario a cualquiera del planeta en cuestión de segundos. La realidad, claro, hace que el tema sea mucho más complejo.`,
    date: 'Feb 31, 1894',
  },
  {
    id: 4,
    srcImage: '/img/placeholderlogo.png',
    title: '¿Por qué le pusieron bandera a los países?',
    text: `El primer estandarte documentado históricamente existió en el Imperio Persa: según la leyenda, un herrador se rebeló contra el tirano que...`,
    date: 'Nov 04, 1578',
  },
]

const HomePage = () => {
  
  const postList = posts.map((post) => {
    return <CardPost key={post.id} {...post} />
  })

  return (
    <>
      <SearchBar />
      <div className={styles.containerCards}>{postList}</div>
    </>
  )
}

export default HomePage
