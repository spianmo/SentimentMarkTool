import styled from '@emotion/styled';
import { keyframes, css, jsx } from '@emotion/core';
import React, { Component } from "react";

import { emojiColors } from './colors';

export const Emoji = styled.div`
  ${emojiColors};
  width: 120px;
  height: 120px;
  background: var(--emoji-color-base);
  border-radius: 50%;
  position: relative;
`;
