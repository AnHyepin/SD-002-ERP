import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = {
    operation: {
      title: '운영',
      subItems: [
        { name: '매장 관리', path: '/operation/store' },
        { name: '사용자 관리', path: '/operation/user' },
        { name: '자재 관리', path: '/operation/material' },
        { name: '제품(BOM) 관리', path: '/operation/bom' }
      ]
    },
    inventory: {
      title: '재고',
      subItems: [
        { name: '분사 재고 조회', path: '/inventory/branch' },
        { name: '매장 재고 조회', path: '/inventory/store' }
      ]
    },
    supply: {
      title: '공급',
      subItems: [
        { name: '공급 요청 관리', path: '/supply/request' },
        { name: '출고 지시 관리', path: '/supply/delivery' },
        { name: '출고 처리', path: '/supply/process' }
      ]
    },
    manufacturing: {
      title: '제조',
      path: '/manufacturing'
    },
    quality: {
      title: '품질',
      path: '/quality'
    },
    sales: {
      title: '판매',
      path: '/sales'
    },
    settlement: {
      title: '정산',
      path: '/settlement'
    }
  };

  const handleMouseEnter = (menuKey) => {
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="nav">
      <ul className="main-menu">
        {Object.entries(menuItems).map(([key, item]) => (
          <li key={key} 
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}>
            {item.subItems ? (
              <>
                <span>{item.title}</span>
                {activeMenu === key && (
                    <ul className="sub-menu">
                      {item.subItems.map((subItem) => (
                          <li key={subItem.path}>
                            <Link to={subItem.path} className="menu-label">
                              {subItem.name}
                            </Link>
                          </li>
                      ))}
                    </ul>

                )}
              </>
            ) : (
              <Link to={item.path}>{item.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav; 