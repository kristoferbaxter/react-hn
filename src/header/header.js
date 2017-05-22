import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import objstr from 'obj-str';

import Logo from '../icons/logo.js';

import styles from './header.css';

const Item = ({href, text, exact=false}) => {
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
          <Link to='/' aria-label="Home">
            <Logo />
          </Link>
        </li>
        <Item href='/' text='top' exact={true} />
        <Item href='/new' text='new'/>
        <Item href='/show' text='show'/>
        <Item href='/ask' text='ask'/>
        <Item href='/jobs' text='jobs'/>
        <Item href='/about' text='about'/>
      </ol>
    </nav>
  );
}