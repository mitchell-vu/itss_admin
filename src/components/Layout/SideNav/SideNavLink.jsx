import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SideNavLink = styled(NavLink)`
  text-decoration: none;
  width: 100%;

  &.active {
    .side-nav__link {
      &__icon {
        cursor: default;
        color: ${(props) => props.color} !important;
        background-color: ${(props) => props.altcolor} !important;
      }
      &__title {
        font-weight: 700;
      }
    }
    &::before {
      content: "";
      position: absolute;
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background-color: ${(props) => props.color} !important;
      left: -1rem;
      transform: translateX(-50%);
    }
  }
`;

export default SideNavLink;
