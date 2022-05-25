import React, { Component } from "react";
import "../assets/css/facebook-emojis.css";

export default class FacebookEmoji extends Component {

    render() {
        let Emoji = emojis["like"];
        if (this.props.hasOwnProperty('type')) {
            Emoji = emojis[this.props.type] ? emojis[this.props.type] : emojis["like"];
        }
        return (
            <div id="zama-emoji">
                <Emoji size={this.props.size} />
            </div>
        );
    }
}


const emojis = {
    good: (props) => <div className={'zama-emoji emoji--like ' + (props.size? props.size: 'md')}>
        <div className="emoji__hand">
            <div className="emoji__thumb" />
        </div>
    </div>
    ,
    favor: (props) => <div className={'zama-emoji emoji--love ' + (props.size? props.size: 'md')}>
        <div className="emoji__heart" />
    </div>
    ,
    happiness: (props) => <div className={'zama-emoji emoji--haha ' + (props.size? props.size: 'md')}>
        <div className="emoji__face">
            <div className="emoji__eyes" />
            <div className="emoji__mouth">
                <div className="emoji__tongue" />
            </div>
        </div>
    </div>,
    like: (props) => <div className={'zama-emoji emoji--yay ' + (props.size? props.size: 'md')}>
        <div className="emoji__face">
            <div className="emoji__eyebrows" />
            <div className="emoji__mouth" />
        </div>
    </div>,
    surprise: (props) => <div className={'zama-emoji emoji--wow ' + (props.size? props.size: 'md')}>
        <div className="emoji__face">
            <div className="emoji__eyebrows" />
            <div className="emoji__eyes" />
            <div className="emoji__mouth" />
        </div>
    </div>,
    sadness: (props) => <div className={'zama-emoji emoji--sad ' + (props.size? props.size: 'md')}>
        <div className="emoji__face">
            <div className="emoji__eyebrows" />
            <div className="emoji__eyes" />
            <div className="emoji__mouth" />
        </div>
    </div>,
    anger: (props) => <div className={'zama-emoji emoji--angry ' + (props.size? props.size: 'md')}>
        <div className="emoji__face">
            <div className="emoji__eyebrows" />
            <div className="emoji__eyes" />
            <div className="emoji__mouth" />
        </div>
    </div>,
    fear: (props) => <FearStyled animate={true} className={'zama-emoji emoji--sad ' + (props.size? props.size: 'md')}>
        <Eyebrow css={leftEyebrow} />
        <Eyebrow css={rightEyebrow} />
        <Eye css={leftEyeStyles} />
        <Eye css={rightEyeStyles} />
        <Mouth />
    </FearStyled>,
    disgust: (props) => <div className={'zama-emoji emoji--disgust ' + (props.size? props.size: 'md')}>
        <div className="emoji__face">
            <div className="emoji__eyebrows" />
            <div className="emoji__eyes" />
            <div className="emoji__mouth" />
        </div>
    </div>,
    none: (props) => <NoneStyled animate={true} className={'zama-emoji emoji--haha ' + (props.size? props.size: 'md')}>
        <Eyebrow css={leftEyebrow} />
        <Eyebrow css={rightEyebrow} />
        <Eye css={leftEyeStyles} />
        <Eye css={rightEyeStyles} />
    </NoneStyled>,
    trash: (props) => <TrashStyled animate={true} className={'zama-emoji ' + (props.size? props.size: 'md')}>

    </TrashStyled>
};

import styled from '@emotion/styled';
import { keyframes, css, jsx } from '@emotion/core';
import { emojiColors } from './colors';
import {Emoji} from "@/components/Emoji";


const eyesAnimation = keyframes`
	50% {transform: scaleY(1.1); }
`;

const gradientAnimation = keyframes`
	0%, 100% {
		background-position: 100% 100%;
	}
	50% {
		background-position: 0% 0%;
	}
`;

const eyebrowAnimation = keyframes`
	50% { transform: translateY(-3px); }
`;

const mouthAnimation = keyframes`
	50% { transform: scaleY(1.3) }
`;

const Mouth = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 30px;
  height: 15px;
  left: calc(50% - 15px);
  top: calc(50% + 20px);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: var(--emoji-color-black);
  border: 5px solid var(--emoji-color-black);
  animation: ${mouthAnimation} 2.5s ease-in-out infinite;
`;

const Eye = styled.div`
  ${props => props.css}
  position: absolute;
  top: calc(50% - 10px);
  width: 12px;
  height: 17px;
  background: var(--emoji-color-black);
  border-radius: 50%;
  animation: ${eyesAnimation} 2.5s linear infinite;
`;

const FearStyled = styled(Emoji)`
  background: linear-gradient(
    to bottom,
    var(--emoji-color-blue),
    var(--emoji-color-base)
  );
  background-size: 200% 200%;
  background-position: 100% 100%;
  transform: scale(${props => props.scale});
  ${({ animate }) =>
    animate
        ? css`
          animation: ${gradientAnimation} 2.5s linear infinite;
        `
        : css`
          * {
            animation: none !important;
          }
        `};
`;

const NoneStyled = styled(Emoji)`
  background: linear-gradient(
    to bottom,
    #f2b04d,
    var(--emoji-color-base)
  );
  background-size: 200% 200%;
  background-position: 100% 100%;
  ${({ animate }) =>
    animate
        ? css`
          animation: ${gradientAnimation} 2.5s linear infinite;
        `
        : css`
          * {
            animation: none !important;
          }
        `};
`;

const TrashStyled = styled.div`
  ${emojiColors};
  width: 120px;
  height: 120px;
  background: var(--emoji-color-base);
  border-radius: 50%;
  position: relative;
  background: linear-gradient(
    to bottom,
    #546e7a, 
    #d7ccc8
  );
  background-size: 200% 200%;
  background-position: 100% 100%;
  ${({ animate }) =>
    animate
        ? css`
          animation: ${gradientAnimation} 2.5s linear infinite;
        `
        : css`
          * {
            animation: none !important;
          }
        `};
`;

const Eyebrow = styled.div`
  ${props => props.css}
  position: absolute;
  box-sizing: border-box;
  width: 34px;
  height: 30px;
  top: calc(50% - 25px);
  border-radius: 50%;
  border: 4px solid var(--emoji-color-black);
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: ${eyebrowAnimation} 2.5s ease-in-out infinite;
`;

const leftEyebrow = css`
  left: calc(50% - 42px);
`;

const rightEyebrow = css`
  right: calc(50% - 42px);
`;

const leftEyeStyles = css`
  left: calc(50% - 30px);
`;

const rightEyeStyles = css`
  right: calc(50% - 30px);
`;


