import styled from "styled-components"
import empty from '../assets/empty.svg';
import circleBg from '../assets/circleBg.svg';
import crossBg from '../assets/crossBg.svg';
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hookes";
import { RootState } from "../redux/store";
import { endTurn, makeTurn, reduceItemsCounts } from "../redux/slices/game";

type CellProps = {
  status: '' | 'circle' | 'cross',
  children: string | JSX.Element | JSX.Element[],
  index?: number,
}

const Block = styled.div<{$status: string}>`
  position: relative;
  height: 100%;
  width: 100%;
  background: url(${({$status}) => $status === '' ? empty : $status === 'circle' ? circleBg: $status === 'cross' && crossBg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Cell: React.FC<CellProps> = ({ children, status, index }) => {
  const dispatch = useAppDispatch();
  const { turn, values, itemsCounts, chosenValues } = useAppSelector((state: RootState) => state.game);

  const handleSetElement = () => {
    const type = turn;

    if(itemsCounts[type][chosenValues[type]-1] > 0 && index !== undefined) {
      const newItemValue = chosenValues[type];
      console.log(newItemValue);
      const oldItemValue = values[index][1];
      if(newItemValue > oldItemValue) {
        dispatch(reduceItemsCounts({type, value: chosenValues[type]-1}));
        dispatch(makeTurn({index, value: [ type, newItemValue]}));
        dispatch(endTurn());
      }
    }
  }

  return (
    <Block $status={status} onClick={handleSetElement}>
      {children}
    </Block>
  )
}
export default Cell;