import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarIcon from "../../../components/styles/SidebarIcon";

import Link from "../../../components/Link";

const MenuNode = styled.div`
  color: #78909c;
  margin: 20px 0;

  > a, a:hover {
    text-decoration: none;
    color: #78909C;
    font-weight: 500;
  }

  ${props => props.active && css`
    > a, a:hover {
      color: #4432F5;
    }
  `}
`;

const ChildrenItems = styled.div`
  margin: 10px 0 10px 26px;

  ${MenuNode} {
    margin: 10px 0;

    > a {
      font-weight: normal;
    }
  }
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 2px;

  svg {
    stroke-width: 0;
    fill: #78909C;
    stroke: #78909C;
  }

  ${props => props.active && css`
    svg {
        fill: #4432F5;
        stroke: #4432F5;
      }
  `}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
`;

const TreeNode = ({ url, title, items = [], icon, hiddenFromNav, config = { gatsby: {} } }) => {
  if (hiddenFromNav) {
    return null;
  }
  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }
  const expanded =
    !url || location && (location.pathname.startsWith(url) || location.pathname.startsWith(config.gatsby.pathPrefix + url));

  let isActive = false
  if (expanded) {
    isActive = true;
  }

  if (url === '/' && location && location.pathname !== "/") {
    isActive = false;
  }

  return (
    <MenuNode active={isActive}>
      {title && (
        <Link to={url}>
          <MenuItem>
            {icon && <IconWrapper active={isActive}><SidebarIcon type={icon} /></IconWrapper>}
            {title}
          </MenuItem>
        </Link>
      )}
      {expanded && hasChildren ? (
        <ChildrenItems>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              {...item}
            />
          ))}
        </ChildrenItems>
      ) : null}
    </MenuNode>
  );
};

export default TreeNode;
