import { useAppSelector } from '@/redux/hooks';
import { selectEnableFlashing } from '@/redux/stores/preference';
import { getWeightedRandom, random } from '@/utils/math';
import { useState } from 'react';
import Confetti from 'react-confetti'
import styled from 'styled-components';
import { cssVars } from '../master/Theme';
import AnimatedWheel, { AnimatedWheelState } from './AnimatedWheel';
import { Item } from './Wheel';

const Wrap = styled.div`
  background: ${cssVars.color.surface};
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;
const Label = styled.div`
  padding: ${cssVars.spacing.gap2x};
  background: ${cssVars.color.secondary};
  color: ${cssVars.color.onSecondary};
  text-align: center;
  font-weight: 600;
  font-size: ${cssVars.fontSize.title};
`;
const ConfettiWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const prizeWithWeight = [
  {value: 'Free lifetime beer*', prob: 10},
  {value: 'World peace*', prob: 1},
  {value: 'Absolutelly nothing', prob: 100},
  {value: 'Complimentary otter*', prob: 2},
  {value: 'Fake 70% discount', prob: 50},
]

const getItems = (hueStart: number, hueEnd: number, numItems: number) => {
  const items: Item[] = [];
  const range = [hueStart, hueEnd].sort();
  const step = (range[1] - range[0]) / numItems;
  for (let i = 0; i < numItems; i++) {
    items.push({
      color: `hsl(${range[0] + i * step}, 100%, 50%)`,
      text: getWeightedRandom(prizeWithWeight)!,
    });
  }

  return items;
}

const ModalContent = () => {
  const flashing = useAppSelector(selectEnableFlashing);
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [prize, setPrize] = useState<Item | undefined>();
  const [items] = useState(getItems(hueStart, hueStart + 120, 10));

  return (
    <Wrap>
      {state === 'completed' &&
        <ConfettiWrap>
          <Confetti
            numberOfPieces={100}
            width={500}
            height={500}
          />
        </ConfettiWrap>
      }

      <AnimatedWheel
        flashing={flashing}
        items={items}
        onStateChange={(newState) => setState(newState)}
        onSpinCompleted={(newPrize) => setPrize(newPrize)}
        />

      {state !== 'completed' &&
        <Label>Let's spin the wheel!!</Label>
      }
      {(state === 'completed' && prize) &&
        <Label>You won! {prize.text}</Label>
      }
    </Wrap>
  )
}

export default ModalContent;
