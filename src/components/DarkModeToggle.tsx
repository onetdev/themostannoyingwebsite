import styled from "styled-components";
import { selectDarkMode, setDarkMode } from "@/redux/stores/preference";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cssVars } from "./master/Theme";

const SelectorOption = styled.span`
  flex-grow: 1;
  z-index: 1;
  cursor: pointer;
  text-align: center;
`;
const InDarkMode = styled(SelectorOption)``;
const InDayMode = styled(SelectorOption)``;

const Toggler = styled.div<{isDarkMode: boolean}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 60px;
  height: 20px;
  user-select: none;
  border: 1px solid ${cssVars.color.secondary};
  border-radius: 10px;
  &:before {
    content: "";
    position: absolute;
    width: 50%;
    background: ${cssVars.color.secondary};
    height: 100%;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    transform: translateX(${props => (props.isDarkMode ? "0" : "100%")});
  }
`;

const DarkModeToggle = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(selectDarkMode);

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <Toggler onClick={toggleDarkMode} isDarkMode={isDarkMode}>
      <InDayMode role="img" aria-label="sun">☀️</InDayMode>
      <InDarkMode role="img" aria-label="moon">🌙</InDarkMode>
    </Toggler>
  );
}

export default DarkModeToggle;
