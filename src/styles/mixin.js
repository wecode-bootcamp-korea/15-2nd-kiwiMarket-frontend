import { css } from "styled-components/native";
import { windowWidth } from "../constants/Layout";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexRowMarginXView = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${windowWidth - 32}px;
  padding: 16px 0;
  margin-left: 16px;
  border: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
`;
