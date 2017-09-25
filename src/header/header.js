import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import objstr from 'obj-str';

import Logo from '../icons/logo.js';

import styles from './header.css';

function Item({href, text, exact=false}) {
  return (
    <li className={styles.item}>
      <NavLink to={href} exact={exact} className={styles.link} activeClassName={styles.active}>{text}</NavLink>  
    </li>
  );
};

export default function() {
  return (
    <nav className={styles.header}>
      <ol className={styles.links}>
        <li className={styles.logo}>
          <Link to='/top/1' aria-label="Home">
            <Logo />
          </Link>
        </li>
        <Item href='/top/1' text='top' exact={true} />
        <Item href='/new/1' text='new'/>
        <Item href='/show/1' text='show'/>
        <Item href='/ask/1' text='ask'/>
        <Item href='/jobs/1' text='jobs'/>
        <Item href='/about' text='about'/>
      </ol>
    </nav>
  );
}