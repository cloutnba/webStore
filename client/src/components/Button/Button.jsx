import {ButtonBase} from "@mui/material";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import PropTypes from 'prop-types'
import './Button.scss'

const mixin = (props) => {
    switch (props.variant) {
      case 'gradient-green':
        return css`
          && {color: #ffffff;
          background: linear-gradient(#8EE902, #4F9C2C);
          box-shadow: 0px 5px 6px rgba(79, 156, 44, 0.6);
            &:hover {
              ${hoverGradientGreen}
            }}
        `;
      case 'white-shadow':
        return css`
          && {color: #000000;
          background: #ffffff;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
           &:hover {
             ${hoverWhiteShadow}
           }}
        `;
        case 'pale-green':
         return css`
            && {background: #d6e3d1;
            color: #4d9546;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;}
         `

      default:
        return css`
          && {color: rgb(245, 240, 240);
          background: #4ba123;
           &:hover {
            ${hoverGreen}
           }}
        `;
    }
  };

  const hoverGreen = css`
    background: #d6e3d1;
    color: #4d9546;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  `

  const hoverGradientGreen = css`
   background: #4ba123;
   //linear-gradient(#d6e3d1, rgba(79, 156, 44, 1));
    //color: #4d9546;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  `

  const hoverWhiteShadow = css`
    box-shadow: 0px 3px 8px rgba(79, 156, 44, 0.6);
    background: rgba(79, 156, 44, 0.6);
    color: #FFFFFF;
    //background: linear-gradient(to bottom, #FFFFFF, #D3D3D3);
  `
  const widthMixin = css`
  && {
    width: ${props => props.width || "240px"};
  }
`;
  const ButtonMain = styled(ButtonBase).attrs((props) => ({
    href: props.href,
    component: props.to && Link,
    to: props.to,
  })) `
  && {
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        cursor: pointer;
        min-width: 50px;
        height: 50px;
        border-radius: 30px;
        border: none;
        transition: background 0.4s ease;
     }
    ${(props) => mixin(props)}
    ${widthMixin}
  `;

const Button = ({text, endIcon, startIcon, disabled, type, variant, width, href, to, className, ...restProps}) => {

    const buttonClassName = classnames({
        'gradient-green': variant === 'gradient-green',
        'pale-green': variant === 'pale-green',
        'white-shadow': variant === 'white-shadow'
      }, className);


return (
    <ButtonMain
        type={type}                 // тип кнопки (button, submit) =>  type="button"
        variant={variant}           // зовнішній вигляд (gradient-green, white-shadow...) => variant="gradient-green"
        width={width}               // ширину задавати тільки в тому випадку, якщо кнопка повинна бути менша 240px
        href={href}                 // посилання для кнопки типу a href=""  => href="products"
        to={to}                     // посилання для кнопки типу Link to="" => to="products"
        className={buttonClassName} // ігнорувати. також можна передавати до кнопки новий додатковий className
        {...restProps}
        disabled={disabled}
        >
        <span className="button__start-icon">{startIcon}</span>
        {text}
        <span className="button__end-icon">{endIcon}</span>
    </ButtonMain>
)

}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.number,
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string
}


export default Button;
