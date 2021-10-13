import './styles.css'
import { ClickCounter } from './clickCounter'

export const App = () => {
  const andre = 'asddsdf'
  console.log(andre)
  return (
    <>
      <h1>
        Project structures for verseo es - {process.env.NODE_ENV} -{' '}
        {process.env.name}
      </h1>
      <ClickCounter />
    </>
  )
}
