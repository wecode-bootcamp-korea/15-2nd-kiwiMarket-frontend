import { css } from "styled-components/native";
import { windowWidth } from "../constants/Layout";

export const flexCenter = css`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const kiwiButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.kiwi};
`;

export const longKiwiButton = css`
  justify-content: center;
  align-items: center;
  width: ${windowWidth * 0.9}px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.kiwi};
  border-radius: 4px;
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

export const LoadingContainer = css`
  ${flexCenter}
  flex: 1;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 999;
`;
