import './App.css'
import Item from './components/Item';
import Cell from './components/Cell';
import Count from './components/Count';
import { useAppSelector } from './redux/hookes';
import { RootState } from './redux/store';
import { checkWinner } from './utils';




// const values:Array<valueParams> = [
//   [0, 0], [0, 0], [0, 0],
//   [0, 0], [0, 0], [0, 0],
//   [0, 0], [0, 0], [0, 0],
// ]





function App() {
  const { values, turn } = useAppSelector((state: RootState) => state.game);
  const win = checkWinner(values);

  

  return (
    <div className='container'>
      <Count type='cross' />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <section className='grid'>
            {
              values.map((item, index) => (
                <Cell key={index} index={index} status={item[0]}>
                  {item[1] ?
                    <Item value={item[1]} type={item[0]} />
                    : ''
                  }
                </Cell>
              ))
            }
          </section>
          <h1 className='turn'>
            {win === 'cross' ?
              <span className='orange'>X win</span>
              : win === 'circle' ? <span className='blue'>O win</span>
              : turn === 'circle' ? 
                <span className='blue'>O turn</span>
              : turn === 'cross' &&
                <span className='orange'>X turn</span>
            }
          </h1>
        </div>
      <Count type='circle' />
    </div>
  )
}

export default App
