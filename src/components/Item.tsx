import Cross from '../assets/cross.svg';
import Circle from '../assets/circle.svg';
import styled from 'styled-components';

type ItemProps = {
  value: 0 | 1 | 2 | 3,
  type: 'circle' | 'cross' | ''
}

const Img = styled.img<{$value: number}>`
  height: ${({$value}) => $value === 2 ? 60 * 1.25 : $value === 3 ? 60 * 1.6 : 60 * 0.8}px;
  width: ${({$value}) => $value === 2 ? 60 * 1.25 : $value === 3 ? 60 * 1.6 : 60 * 0.8}px;
`

const Item: React.FC<ItemProps> = ({value, type}) => {


  

  return (
    <>
      {type === 'circle' ?
        <Img $value={value} src={Circle} alt="" />
        : type === 'cross' &&
        <Img $value={value} src={Cross} alt="" />
      }
      <span className="value">{value}</span>
    </>
  )
}

export default Item;