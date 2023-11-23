import styled from "styled-components"
import Cross from '../assets/cross.svg';
import Circle from '../assets/circle.svg';
import Cell from "./Cell";
import { useAppDispatch, useAppSelector } from "../redux/hookes";
import { RootState } from "../redux/store";
import { chooseValue } from "../redux/slices/game";

type CountProps = {
  type: 'circle' | 'cross'
}

const Img = styled.img<{$value: number, empty?: boolean}>`
  height: ${({$value}) => $value === 2 ? 60 * 1.25 : $value === 3 ? 60 * 1.6 : 60 * 0.8}px;
  width: ${({$value}) => $value === 2 ? 60 * 1.25 : $value === 3 ? 60 * 1.6 : 60 * 0.8}px;
`

const Count: React.FC<CountProps> = ({type}) => {
  
  const { itemsCounts, chosenValues, turn } = useAppSelector((state: RootState) => state.game);
  const dispatch = useAppDispatch();
  
  const valueChooseHandler = (value: number) => {

    if(itemsCounts[type][value-1] > 0) {
      dispatch(chooseValue({
        ...chosenValues,
        [type]: value
      }))
    }
  }

  return (
    <div className={`count`}>
      {type === 'circle' ?
        <h2>CIRCLE</h2>
        : type === 'cross' &&
        <h2 style={{alignSelf: 'flex-start'}}>CROSS</h2>
      }
      {itemsCounts[turn].map((item, i) => {
        const index = i + 1;
        return <div key={index} className={`item ${chosenValues[type] === index && turn === type ? 'border' : ''} ${item === 0 || turn !== type ? 'empty' : ''}`} onClick={() => valueChooseHandler(index)}>
          <Cell status={type}>
            <Img src={type === 'circle' ? Circle : type === 'cross' ? Cross : ''} $value={index} />
            <span className="number">{itemsCounts[type][i]}</span>
          </Cell>
        </div>
      })}
    </div>
  )
}

export default Count;